import { NextResponse } from "next/server";
import { recordApplicationInExcel } from "@/lib/excel";
import { sendApplicationEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const location = formData.get("location")?.toString().trim();
    const department = formData.get("department")?.toString().trim();
    const role = formData.get("role")?.toString().trim() || "General Application";
    const profile = formData.get("profile")?.toString().trim();
    const resumeFile = formData.get("resume") as File | null;

    if (!name || !email || !phone || !location || !department || !profile) {
      return NextResponse.json(
        { success: false, error: "Please provide all required fields." },
        { status: 400 }
      );
    }

    if (!resumeFile) {
      return NextResponse.json(
        { success: false, error: "Please attach your résumé file." },
        { status: 400 }
      );
    }

    const resumeArrayBuffer = await resumeFile.arrayBuffer();
    const resumeBuffer = Buffer.from(resumeArrayBuffer);
    const resumeFileSizeKB = Math.round(resumeBuffer.length / 1024);

    // 1. Record application to Excel (data/applications.xlsx) and optional Google Sheet webhook
    await recordApplicationInExcel({
      name,
      email,
      phone,
      location,
      department,
      role,
      profile,
      resumeFileName: resumeFile.name,
      resumeFileSizeKB,
    });

    // 2. Send email notification to HR with the resume attached
    await sendApplicationEmail({
      name,
      email,
      phone,
      location,
      department,
      role,
      profile,
      resumeBuffer,
      resumeFileName: resumeFile.name,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully and recorded in Excel & sent to HR.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[API /api/apply Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "An unexpected error occurred while processing your application.",
      },
      { status: 500 }
    );
  }
}

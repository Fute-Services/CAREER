"use server";

import { recordApplicationInExcel } from "@/lib/excel";
import { sendApplicationEmail } from "@/lib/email";
import { uploadResumeToGitHub } from "@/lib/github";

export interface SubmitApplicationResult {
  success: boolean;
  error?: string;
  message?: string;
}

export async function submitApplication(formData: FormData): Promise<SubmitApplicationResult> {
  try {
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const location = formData.get("location")?.toString().trim();
    const department = formData.get("department")?.toString().trim();
    const role = formData.get("role")?.toString().trim() || "General Application";
    const profile = formData.get("profile")?.toString().trim();
    const resumeFile = formData.get("resume") as File | null;

    if (!name || !email || !phone || !location || !department || !profile) {
      return { success: false, error: "Please provide all required fields." };
    }

    if (!resumeFile || typeof resumeFile === "string") {
      return { success: false, error: "Please attach your résumé file." };
    }

    const resumeArrayBuffer = await resumeFile.arrayBuffer();
    const resumeBuffer = Buffer.from(resumeArrayBuffer);
    const resumeFileSizeKB = Math.round(resumeBuffer.length / 1024);

    // 1. Upload Resume directly to GitHub Repository (or local fallback)
    const uploadResult = await uploadResumeToGitHub({
      candidateName: name,
      fileName: resumeFile.name,
      fileBuffer: resumeBuffer,
    });

    // 2. Record application in Excel
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
      resumeFileUrl: uploadResult.fileUrl,
    });

    // 3. Send email notification to HR with attached resume
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

    return {
      success: true,
      message: "Application submitted successfully.",
    };
  } catch (error: any) {
    console.error("[submitApplication Action Error]:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred while processing your application.",
    };
  }
}

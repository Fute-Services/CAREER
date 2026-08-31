import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

export interface CandidateApplication {
  name: string;
  email: string;
  phone: string;
  location: string;
  department: string;
  role: string;
  profile: string;
  resumeFileName: string;
  resumeFileSizeKB: number;
  resumeFileUrl?: string;
  submittedAt?: string;
}

const DATA_DIR = process.env.VERCEL ? path.join("/tmp", "data") : path.join(process.cwd(), "data");
const EXCEL_FILE_PATH = path.join(DATA_DIR, "applications.xlsx");

/**
 * Ensures data directory and Excel workbook exist, then appends candidate application.
 */
export async function recordApplicationInExcel(data: CandidateApplication): Promise<void> {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    const timestamp = data.submittedAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const newRow = {
      "Submission Date & Time": timestamp,
      "Candidate Name": data.name,
      "Email Address": data.email,
      "Mobile Number": data.phone,
      "Current Location": data.location,
      "Department": data.department,
      "Applied Role": data.role || "General Application",
      "Work Profile / Summary": data.profile,
      "Resume File Name": data.resumeFileName,
      "Resume Size (KB)": data.resumeFileSizeKB,
      "Resume GitHub Link": data.resumeFileUrl || "Attached in Email",
    };

    let workbook: XLSX.WorkBook;
    let worksheet: XLSX.WorkSheet;

    if (fs.existsSync(EXCEL_FILE_PATH)) {
      const fileBuffer = fs.readFileSync(EXCEL_FILE_PATH);
      workbook = XLSX.read(fileBuffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0] || "Applications";
      worksheet = workbook.Sheets[sheetName];
      const existingData = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet);
      existingData.push(newRow);
      const updatedSheet = XLSX.utils.json_to_sheet(existingData);
      workbook.Sheets[sheetName] = updatedSheet;
    } else {
      workbook = XLSX.utils.book_new();
      worksheet = XLSX.utils.json_to_sheet([newRow]);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
    }

    XLSX.writeFile(workbook, EXCEL_FILE_PATH);
    console.log(`[Excel] Successfully recorded application for ${data.name} in ${EXCEL_FILE_PATH}`);

    // Optional: If a Google Sheets Webhook is configured, post in real-time
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRow),
        });
        console.log(`[Google Sheets] Synced application to Google Sheet webhook for ${data.name}`);
      } catch (err) {
        console.warn(`[Google Sheets Webhook Error]:`, err);
      }
    }
  } catch (error) {
    console.error("[Excel Error] Failed to record application to excel:", error);
  }
}

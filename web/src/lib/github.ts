import fs from "fs";
import path from "path";

export interface GitHubUploadParams {
  candidateName: string;
  fileName: string;
  fileBuffer: Buffer;
}

export interface GitHubUploadResult {
  success: boolean;
  fileUrl: string;
  filePath: string;
  source: "github" | "local_fallback";
}

/**
 * Uploads a candidate resume to the GitHub repository via GitHub REST API.
 * If GITHUB_TOKEN is not configured, it safely saves to local /data/resumes/ folder as a fallback.
 */
export async function uploadResumeToGitHub(params: GitHubUploadParams): Promise<GitHubUploadResult> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER || "Fute-Services";
  const repo = process.env.GITHUB_REPO_NAME || "CAREER";
  const branch = process.env.GITHUB_BRANCH || "main";

  const now = new Date();
  const dateFolder = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const timestamp = Date.now();

  // Sanitize candidate filename
  const cleanName = params.candidateName.replace(/[^a-zA-Z0-9]/g, "_");
  const extension = path.extname(params.fileName) || ".pdf";
  const repoFilePath = `resumes/${dateFolder}/${timestamp}_${cleanName}${extension}`;

  // If token is provided, upload directly to GitHub
  if (token) {
    try {
      const contentBase64 = params.fileBuffer.toString("base64");
      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${repoFilePath}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
          "User-Agent": "FuteServices-Career-Portal",
        },
        body: JSON.stringify({
          message: `chore(resumes): upload resume for ${params.candidateName}`,
          content: contentBase64,
          branch: branch,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const githubUrl = data.content?.html_url || `https://github.com/${owner}/${repo}/blob/${branch}/${repoFilePath}`;
        console.log(`[GitHub Storage] Successfully committed resume to GitHub: ${githubUrl}`);
        return {
          success: true,
          fileUrl: githubUrl,
          filePath: repoFilePath,
          source: "github",
        };
      } else {
        const errorText = await response.text();
        console.error(`[GitHub Storage Error] Status ${response.status}:`, errorText);
      }
    } catch (err) {
      console.error("[GitHub Storage Exception]:", err);
    }
  } else {
    console.warn("[GitHub Storage] GITHUB_TOKEN not found in environment. Saving to local storage fallback.");
  }

  // Fallback: Save to local data/resumes directory
  try {
    const localDir = path.join(process.cwd(), "data", "resumes", dateFolder);
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    const localFileName = `${timestamp}_${cleanName}${extension}`;
    const localFullPath = path.join(localDir, localFileName);
    fs.writeFileSync(localFullPath, params.fileBuffer);

    console.log(`[Local Fallback Storage] Saved resume locally at: ${localFullPath}`);
    return {
      success: true,
      fileUrl: `https://github.com/${owner}/${repo}/blob/${branch}/${repoFilePath}`,
      filePath: repoFilePath,
      source: "local_fallback",
    };
  } catch (localErr) {
    console.error("[Local Storage Error]:", localErr);
    return {
      success: false,
      fileUrl: "",
      filePath: repoFilePath,
      source: "local_fallback",
    };
  }
}

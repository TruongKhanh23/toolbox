import fs from "fs";
import path from "path";

/**
 * Quét file txt và xuất danh sách chuỗi theo regex ra TXT
 */
export default function extractRegexToTxt() {
  // Thư mục hiện tại
  const __dirname = path.resolve();

  // File input
  const inputPath = path.join(__dirname, "input.txt");

  // File output TXT
  const outputPath = path.join(__dirname, "output.txt");

  // Regex tìm BFxxxx (4 chữ số)
  const regexPattern = /BF\d{4}/g;

  try {
    // 1. Đọc file txt
    const content = fs.readFileSync(inputPath, "utf8");

    // 2. Tìm tất cả chuỗi khớp regex
    const matches = content.match(regexPattern) || [];

    // 3. Lọc duy nhất
    const uniqueMatches = [...new Set(matches)];

    // 4. Ghi ra file TXT, mỗi chuỗi 1 dòng
    fs.writeFileSync(outputPath, uniqueMatches.join("\n"), "utf8");

    console.log(
      `Hoàn thành! ${uniqueMatches.length} chuỗi được xuất ra: ${outputPath}`
    );
  } catch (err) {
    console.error("Lỗi:", err.message);
  }
}
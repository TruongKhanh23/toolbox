import fs from "fs";
import path from "path";
import xlsx from "xlsx";

// Hàm chính
export default async function convertLomaCourseGlossaryTxtToExcel() {
  try {
    const inputFilePath = path.resolve(
      "data",
      "convert-txt-to-excel",
      "convert-loma-course-glossary-to-excel",
      "input.txt"
    );

    const outputFilePath = path.resolve(
      "output",
      "convert-txt-to-excel",
      "convert-loma-course-glossary-to-excel",
      "output.xlsx"
    );

    // Đọc file txt
    const fileContent = fs.readFileSync(inputFilePath, "utf8");
    const rawLines = fileContent.split(/\r?\n/);

    let currentGroup = "";
    let stt = 1;
    const data = [["STT", "Group Alphabet", "Glossary", "Definition"]];

    let buffer = ""; // dùng để gom các dòng bị cắt

    function processBuffer() {
      if (!buffer) return;
      const line = buffer.trim();
      const match = line.match(/^(.+?)([A-Z].*)$/);
      if (match) {
        const glossary = match[1].trim();
        const definition = match[2].trim();
        data.push([stt++, currentGroup, glossary, definition]);
      } else {
        console.warn("⚠️ Không parse được dòng:", line);
      }
      buffer = "";
    }

    for (let rawLine of rawLines) {
      let line = rawLine.trim();
      if (!line) continue;

      if (line.length === 1 && /^[A-Z]$/i.test(line)) {
        // Nếu gặp group mới thì process buffer trước
        processBuffer();
        currentGroup = line.toUpperCase();
      } else {
        // Gom vào buffer, tránh trường hợp xuống dòng giữa chừng
        if (buffer) {
          buffer += " " + line;
        } else {
          buffer = line;
        }

        // Nếu line này kết thúc bằng dấu chấm "." => có khả năng là kết thúc 1 definition
        if (/[.!?"]$/.test(line)) {
          processBuffer();
        }
      }
    }

    // Xử lý dòng cuối cùng nếu còn
    processBuffer();

    // Tạo workbook Excel
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.aoa_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Glossary");

    xlsx.writeFile(wb, outputFilePath);

    console.log("✅ Xuất file excel thành công:", outputFilePath);
  } catch (err) {
    console.error("❌ Lỗi:", err);
  }
}

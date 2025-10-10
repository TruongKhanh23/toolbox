import readline from "readline";

export default function generateIndirectReplaceFormula() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Nhập ô tham chiếu (ví dụ: B3): ", function handleCellInput(cell) {
    const charsToReplace = [];

    function askNextChar() {
      rl.question(
        'Nhập ký tự cần thay thế bằng "_" (Nhập **1 dấu cách + Enter** để nhập "space"; Enter trống để kết thúc): ',
        (ch) => {
          // IMPORTANT: không trim ở đây — cần cho phép nhập " " (space)
          if (ch === "") {
            if (charsToReplace.length === 0) {
              console.log("⚠️ Không có ký tự nào được nhập. Kết thúc.");
              rl.close();
              return;
            }

            // Xây dựng công thức SUBSTITUTE lồng nhau
            let formula = cell.trim(); // cell vẫn trim được
            for (const char of charsToReplace) {
              // Nếu người dùng nhập dấu " thì cần escape để đưa vào chuỗi Excel.
              const escaped = char.includes('"') ? char.replace(/"/g, '""') : char;
              // khi char là space, sẽ tạo ra: SUBSTITUTE(...; " "; "_")
              formula = `SUBSTITUTE(${formula}; "${escaped}"; "_")`;
            }

            const fullFormula = `=INDIRECT(${formula})`;
            console.log("\n✅ Công thức Excel được tạo:");
            console.log(fullFormula);
            rl.close();
          } else {
            // Lưu nguyên (bao gồm space)
            charsToReplace.push(ch);
            const visible = ch === " " ? "<space>" : ch;
            console.log(`Đã thêm ký tự: ${visible}`);
            askNextChar();
          }
        }
      );
    }

    askNextChar();
  });
}

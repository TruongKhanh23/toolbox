import readline from "readline";

export default function generateValidationVersionFormula() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Nhập ô muốn áp dụng (ví dụ A1): ", (cellInput) => {
    const cell = cellInput.trim() || "A1";

    rl.question(
      "Nhập các ký tự bắt đầu cho Part4 (ví dụ -+~): ",
      (charsInput) => {
        const part4Chars = charsInput.trim() || "-+";

        const formulas = generateFormulas(cell, part4Chars);

        console.log("\n--- Các Named Formula được tạo ---");
        for (const [name, formula] of Object.entries(formulas)) {
          console.log(`${name}: ${formula}`);
        }

        rl.close();
      }
    );
  });

  function generateFormulas(cell, part4Chars) {
    // Tách ký tự đặc biệt ra mảng
    const chars = part4Chars.split("");

    // Tạo Part4Full: toàn bộ phần sau dấu chấm thứ 3
    const formulas = {
      Part1: `=--LEFT(${cell};FIND("." ;${cell})-1)`,
      Part2: `=--MID(${cell};FIND("." ;${cell})+1;IFERROR(FIND("." ;${cell};FIND("." ;${cell})+1)-FIND("." ;${cell})-1;99))`,
      Part3: `=--MID(${cell};FIND("." ;${cell};FIND("." ;${cell})+1)+1;IFERROR(FIND("." ;${cell};FIND("." ;${cell};FIND("." ;${cell})+1)+1)-FIND("." ;${cell};FIND("." ;${cell})+1)-1;99))`,
      Part4Full: `=MID(${cell};FIND("." ;${cell};FIND("." ;${cell};FIND("." ;${cell})+1)+1)+1;99)`,
    };

    // Tạo Named Formula cho từng ký tự đặc biệt
    chars.forEach((c, index) => {
      formulas[`PosChar${index + 1}`] = `=IFERROR(FIND("${c}"; Part4Full); 99)`;
    });

    // Tạo Part4: lấy số trước ký tự xuất hiện sớm nhất
    if (chars.length === 1) {
      formulas.Part4 = `=--LEFT(Part4Full; PosChar1-1)`;
    } else {
      // Lấy MIN của tất cả PosChar để xác định ký tự xuất hiện đầu tiên
      const posList = chars.map((_, i) => `PosChar${i + 1}`).join("; ");
      formulas.Part4 = `=--LEFT(Part4Full; MIN(${posList})-1)`;
    }

    // Công thức kiểm tra cuối cùng
    formulas.FinalCheck = `=AND(ISNUMBER(Part1); ISNUMBER(Part2); ISNUMBER(Part3); ISNUMBER(Part4))`;

    return formulas;
  }
}

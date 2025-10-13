import readline from "readline";

export default function generateValidationVersionFormula() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // --- Câu hỏi 1: Các pattern đặc biệt (IsSpecial)
  rl.question(
    "Nhập các trường hợp đặc biệt cho hàm IsSpecial (ví dụ: ES,ksh): ",
    (specialInput) => {
      const specials = specialInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      // --- Câu hỏi 2: Ký tự đặc biệt dùng trong PosChar
      rl.question(
        "Nhập các ký tự đặc biệt cho hàm PosChar (ví dụ: -+~): ",
        (charsInput) => {
          const chars = charsInput.trim().split("").filter(Boolean);

          // --- Câu hỏi 3: Ô muốn áp dụng
          rl.question(
            "Nhập ô muốn áp dụng (ví dụ: Sheet1!A1): ",
            (cellInput) => {
              const cell = cellInput.trim() || "Sheet1!A1";

              const formulas = generateFormulas(cell, chars, specials);

              console.log("\n--- ✅ Các Named Formula được tạo ---\n");
              for (const [name, formula] of Object.entries(formulas)) {
                console.log(`${name}: ${formula}\n`);
              }

              rl.close();
            }
          );
        }
      );
    }
  );

  // --- Hàm sinh công thức ---
  function generateFormulas(cell, chars, specials) {
    const formulas = {};

    formulas.DotCount = `=LEN(${cell})-LEN(SUBSTITUTE(${cell};".";""))`;

    formulas.Part1 = `=--LEFT(${cell};FIND("." ;${cell})-1)`;

    formulas.Part2 = `=--MID(${cell};FIND("." ;${cell})+1;IFERROR(FIND("." ;${cell};FIND("." ;${cell})+1)-FIND("." ;${cell})-1;99))`;

    formulas.Part3 = `=IF(DotCount>=2;
   IFERROR(VALUE(LEFT(MID(${cell};
     FIND("." ;${cell};FIND("." ;${cell})+1)+1;99);
     MIN(
       IFERROR(FIND("-";MID(${cell};FIND("." ;${cell};FIND("." ;${cell})+1)+1;99));99);
       IFERROR(FIND("+";MID(${cell};FIND("." ;${cell};FIND("." ;${cell})+1)+1;99));99);
       IFERROR(FIND("." ;MID(${cell};FIND("." ;${cell};FIND("." ;${cell})+1)+1;99));99)
     )-1
   ));"");
   "")`;

    formulas.Part4Full = `=IF(DotCount>=3;
   MID(${cell};
     FIND("." ;${cell};FIND("." ;${cell};FIND("." ;${cell})+1)+1)+1;99);
   "")`;

    // --- Các hàm PosChar theo ký tự nhập ---
    chars.forEach((c, i) => {
      formulas[`PosChar${i + 1}`] = `=IF(Part4Full<>"";IFERROR(FIND("${c}";Part4Full);99);99)`;
    });

    const posList = chars.map((_, i) => `PosChar${i + 1}`).join("; ");
    formulas.Part4 = `=IF(Part4Full<>"";--LEFT(Part4Full;MIN(${posList})-1);"")`;

    // --- Hàm IsSpecial ---
    if (specials.length > 0) {
      const specialClauses = specials
        .map((s) => {
          const prefixLen = s.length;
          return `AND(LEFT(${cell};${prefixLen})="${s}";ISNUMBER(--MID(${cell};${
            prefixLen + 1
          };99)))`;
        })
        .join("; ");
      formulas.IsSpecial = `=OR(${specialClauses})`;
    } else {
      formulas.IsSpecial = `=FALSE`;
    }

    // --- Hàm IsSemVerValid ---
    formulas.IsSemVerValid = `=AND(
  ISNUMBER(Part1);
  ISNUMBER(Part2);
  OR(ISNUMBER(Part3);DotCount=1)
)`;

    // --- Hàm FinalCheck ---
    formulas.FinalCheck = `=OR(IsSpecial;IsSemVerValid)`;

    return formulas;
  }
}

// Gọi hàm nếu chạy trực tiếp bằng Node
if (process.argv[1] && process.argv[1].includes("generateValidationVersionFormula.js")) {
  generateValidationVersionFormula();
}

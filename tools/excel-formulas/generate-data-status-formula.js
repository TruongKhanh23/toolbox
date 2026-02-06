import readline from "readline";

export default function generateDataStatusFormula() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("=== 📋 Generate Excel Data Status Formula (dấu chấm phẩy) ===");

  rl.question("1. Cột nhận diện (ví dụ: A): ", (idCol) => {
    idCol = idCol.trim().toUpperCase();

    rl.question("2. Cột bắt đầu (ví dụ: B): ", (startCol) => {
      startCol = startCol.trim().toUpperCase();

      rl.question("3. Cột kết thúc (ví dụ: D): ", (endCol) => {
        endCol = endCol.trim().toUpperCase();

        rl.question("4. Dòng bắt đầu (ví dụ: 5): ", (rowStart) => {
          rowStart = Number(rowStart.trim());

          // --- Build formula ---
          const formula = `=IF(${idCol}${rowStart}=""; ""; IF(SUMPRODUCT(--(LEN(TRIM(${startCol}${rowStart}:${endCol}${rowStart}))>0))=COLUMNS(${startCol}${rowStart}:${endCol}${rowStart}); "Done"; IF(SUMPRODUCT(--(LEN(TRIM(${startCol}${rowStart}:${endCol}${rowStart}))>0))=0; "To Do"; "In Progress")))`;

          console.log("\n✅ Công thức Excel sinh ra là:\n");
          console.log(formula);

          rl.close();
        });
      });
    });
  });
}
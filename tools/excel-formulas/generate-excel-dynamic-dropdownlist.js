import readline from "readline";

export default function generateExcelDynamicDropdownlist() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("=== 📋 Generate Excel Dynamic Dropdown List Formula (dấu chấm phẩy) ===");

  rl.question("1. Tên sheet chứa dữ liệu gốc (ví dụ: Data): ", (dataSheet) => {
    dataSheet = dataSheet.trim();

    rl.question("2. Cột chứa dữ liệu gốc cho dropdownlist (ví dụ: C): ", (dataCol) => {
      dataCol = dataCol.trim().toUpperCase();

      rl.question("3. Sheet hiển thị (ví dụ: Sheet3): ", (displaySheet) => {
        displaySheet = displaySheet.trim();

        rl.question("4. Ô chứa giá trị parent level (ví dụ: A2): ", (parentCell) => {
          parentCell = parentCell.trim().toUpperCase();

          rl.question("5. Cột chứa dữ liệu parent level ở sheet dữ liệu gốc (ví dụ: B): ", (parentCol) => {
            parentCol = parentCol.trim().toUpperCase();

            rl.question("6. Dòng bắt đầu dữ liệu (ví dụ: 5): ", (rowStart) => {
              rowStart = Number(rowStart.trim());

              rl.question("7. Dòng kết thúc dữ liệu (ví dụ: 200): ", (rowEnd) => {
                rowEnd = rowEnd.trim();

                // --- AUTO OFFSET ---
                const offset = rowStart - 1;

                const formula =
`="'${dataSheet}'!$${dataCol}" &
 (MATCH('${displaySheet}'!$${parentCell}; '${dataSheet}'!${parentCol}$${rowStart}:${parentCol}$${rowEnd}; 0) + ${offset}) &
 ":$${dataCol}" &
 (MATCH('${displaySheet}'!$${parentCell}; '${dataSheet}'!${parentCol}$${rowStart}:${parentCol}$${rowEnd}; 0) 
   + COUNTIF('${dataSheet}'!${parentCol}$${rowStart}:${parentCol}$${rowEnd}; '${displaySheet}'!$${parentCell}) 
   + ${offset} - 1)`;

                console.log("\n✅ Công thức Excel sinh ra là:\n");
                console.log(formula);

                rl.close();
              });
            });
          });
        });
      });
    });
  });
}

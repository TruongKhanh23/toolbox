import readline from "readline";

export default function generateCountifFormula() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("=== 🔢 Generate Excel COUNTIF Formula (dấu chấm phẩy) ===");

  rl.question("Tên sheet chứa vùng cần đếm (ví dụ: Evaluation): ", (sheetName) => {
    sheetName = sheetName.trim();

    rl.question("Cột cần đếm (ví dụ: C): ", (countCol) => {
      countCol = countCol.trim().toUpperCase();

      rl.question("Dòng bắt đầu vùng cần đếm (ví dụ: 5): ", (rowStart) => {
        rowStart = rowStart.trim();

        rl.question("Dòng kết thúc vùng cần đếm (ví dụ: 200): ", (rowEnd) => {
          rowEnd = rowEnd.trim();

          rl.question(
            "Giá trị điều kiện là (1) Hard code hay (2) Ô tham chiếu trong sheet hiện tại? (nhập 1 hoặc 2): ",
            (conditionType) => {
              conditionType = conditionType.trim();

              if (conditionType === "1") {
                // ✅ Hard code value
                rl.question("Nhập chuỗi giá trị cần đếm (ví dụ: Done): ", (hardValue) => {
                  hardValue = hardValue.trim();

                  // Nếu chứa dấu nháy kép, cần escape lại để Excel hiểu đúng
                  const escapedValue = hardValue.replace(/"/g, '""');

                  const formula = `=COUNTIF('${sheetName}'!${countCol}$${rowStart}:${countCol}$${rowEnd}; "${escapedValue}")`;

                  console.log("\n✅ Công thức Excel sinh ra là:\n");
                  console.log(formula);
                  rl.close();
                });
              } else if (conditionType === "2") {
                // ✅ Cell reference
                rl.question("Nhập ô tham chiếu trong sheet hiện tại (ví dụ: A4): ", (cellRef) => {
                  cellRef = cellRef.trim().toUpperCase();

                  const formula = `=COUNTIF('${sheetName}'!${countCol}$${rowStart}:${countCol}$${rowEnd}; ${cellRef})`;

                  console.log("\n✅ Công thức Excel sinh ra là:\n");
                  console.log(formula);
                  rl.close();
                });
              } else {
                console.log("❌ Lựa chọn không hợp lệ. Hãy chạy lại và chọn 1 hoặc 2.");
                rl.close();
              }
            }
          );
        });
      });
    });
  });
}

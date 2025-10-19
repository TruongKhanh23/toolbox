import readline from "readline";

export default function generateColumnFormula() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // 🧩 Bước 1: Hỏi tên sheet
  rl.question(
    "Nhập tên sheet muốn lấy (ví dụ: Raw Data): ",
    function handleSheetName(sheetName) {
      sheetName = sheetName.trim();
      if (!sheetName) {
        console.log("❌ Vui lòng nhập tên sheet hợp lệ.");
        rl.close();
        return;
      }

      // 🧩 Bước 2: Hỏi cột
      rl.question(
        "Nhập cột muốn lấy (ví dụ: A): ",
        function handleColumnInput(column) {
          column = column.trim().toUpperCase();
          if (!column.match(/^[A-Z]+$/)) {
            console.log("❌ Vui lòng nhập ký tự cột hợp lệ (A-Z).");
            rl.close();
            return;
          }

          // 🧩 Bước 3: Hỏi dòng bắt đầu
          rl.question(
            "Nhập dòng bắt đầu (ví dụ: 2): ",
            function handleStartRow(startRow) {
              startRow = parseInt(startRow.trim());
              if (isNaN(startRow) || startRow <= 0) {
                console.log("❌ Vui lòng nhập số dòng bắt đầu hợp lệ (>= 1).");
                rl.close();
                return;
              }

              // 🧩 Bước 4: Hỏi số lượng dòng muốn lấy
              rl.question(
                "Nhập số lượng dòng muốn lấy (ví dụ: 100): ",
                function handleRowCountInput(rowCount) {
                  rowCount = parseInt(rowCount.trim());
                  if (isNaN(rowCount) || rowCount <= 0) {
                    console.log("❌ Vui lòng nhập số nguyên dương hợp lệ.");
                    rl.close();
                    return;
                  }

                  // 🧩 Bước 5: Hỏi có dùng FILTER hay không
                  rl.question(
                    "Có muốn dùng FILTER để loại bỏ giá trị trống không? (y/n): ",
                    function handleFilterChoice(choice) {
                      choice = choice.trim().toLowerCase();

                      const endRow = startRow + rowCount - 1;
                      const range = `${column}${startRow}:${column}${endRow}`;
                      let formula = "";

                      if (choice === "y" || choice === "yes") {
                        formula = `=FILTER('${sheetName}'!${range}; '${sheetName}'!${range}<>"" )`;
                      } else if (choice === "n" || choice === "no") {
                        formula = `='${sheetName}'!${range}`;
                      } else {
                        console.log("❌ Vui lòng chọn 'y' hoặc 'n'.");
                        rl.close();
                        return;
                      }

                      console.log("\n✅ Công thức Excel được tạo:");
                      console.log(formula);
                      rl.close();
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
}

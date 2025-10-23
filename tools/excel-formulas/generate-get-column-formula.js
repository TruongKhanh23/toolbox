import readline from "readline";

export default function generateColumnFormula() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // 🟢 Bước 1: Hỏi tên sheet dữ liệu gốc
  rl.question("Nhập tên sheet dữ liệu gốc (ví dụ: Raw Data): ", function handleSheetName(sheetName) {
    sheetName = sheetName.trim();
    if (!sheetName) {
      console.log("❌ Vui lòng nhập tên sheet hợp lệ.");
      rl.close();
      return;
    }

    // 🟢 Bước 2: Hỏi cột cần lấy
    rl.question("Nhập cột muốn lấy (ví dụ: A): ", function handleColumnInput(column) {
      column = column.trim().toUpperCase();
      if (!column.match(/^[A-Z]+$/)) {
        console.log("❌ Vui lòng nhập ký tự cột hợp lệ (A-Z).");
        rl.close();
        return;
      }

      // 🟢 Bước 3: Hỏi dòng bắt đầu
      rl.question("Nhập dòng bắt đầu (ví dụ: 4): ", function handleStartRow(startRow) {
        startRow = parseInt(startRow.trim());
        if (isNaN(startRow) || startRow <= 0) {
          console.log("❌ Vui lòng nhập số nguyên dương hợp lệ cho dòng bắt đầu.");
          rl.close();
          return;
        }

        // 🟢 Bước 4: Hỏi dòng kết thúc
        rl.question("Nhập dòng kết thúc (ví dụ: 200): ", function handleEndRow(endRow) {
          endRow = parseInt(endRow.trim());
          if (isNaN(endRow) || endRow < startRow) {
            console.log("❌ Vui lòng nhập số nguyên hợp lệ lớn hơn hoặc bằng dòng bắt đầu.");
            rl.close();
            return;
          }

          const range = `${column}${startRow}:${column}${endRow}`;
          const base = `'${sheetName}'!${range}`;

          // 🟢 Bước 5: Hỏi có muốn filter không
          rl.question("Có muốn FILTER dữ liệu không? (y/n): ", function handleFilterChoice(choice) {
            choice = choice.trim().toLowerCase();

            if (choice === "y" || choice === "yes") {
              // 🟢 Bước 6: Hỏi loại filter
              rl.question(
                "Chọn kiểu filter:\n1. Loại bỏ ô rỗng\n2. Loại bỏ ô bằng 0\n3. Loại bỏ cả ô rỗng và bằng 0\nNhập 1 / 2 / 3: ",
                function handleFilterType(filterType) {
                  let formula = "";

                  switch (filterType.trim()) {
                    case "1":
                      formula = `=FILTER(${base}; ${base}<>"" )`;
                      break;
                    case "2":
                      formula = `=FILTER(${base}; ${base}<>0 )`;
                      break;
                    case "3":
                      formula = `=FILTER(${base}; (${base}<>"" )*(${base}<>0) )`;
                      break;
                    default:
                      console.log("❌ Vui lòng chọn 1, 2 hoặc 3.");
                      rl.close();
                      return;
                  }

                  console.log("\n✅ Công thức Excel được tạo:");
                  console.log(formula);
                  rl.close();
                }
              );
            } else if (choice === "n" || choice === "no") {
              const formula = `=${base}`;
              console.log("\n✅ Công thức Excel được tạo:");
              console.log(formula);
              rl.close();
            } else {
              console.log("❌ Vui lòng chọn 'y' hoặc 'n'.");
              rl.close();
            }
          });
        });
      });
    });
  });
}

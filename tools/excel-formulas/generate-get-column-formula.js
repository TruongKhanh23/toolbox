import readline from "readline";

export default function generateColumnFormula() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Bước 1: Hỏi người dùng nhập cột
  rl.question("Nhập cột muốn lấy (ví dụ: A): ", function handleColumnInput(column) {
    column = column.trim().toUpperCase();

    if (!column.match(/^[A-Z]+$/)) {
      console.log("❌ Vui lòng nhập ký tự cột hợp lệ (A-Z).");
      rl.close();
      return;
    }

    // Bước 2: Hỏi số lượng dòng muốn lấy
    rl.question("Nhập số lượng dòng muốn lấy (ví dụ: 100): ", function handleRowCountInput(rowCount) {
      rowCount = parseInt(rowCount.trim());
      if (isNaN(rowCount) || rowCount <= 0) {
        console.log("❌ Vui lòng nhập số nguyên dương hợp lệ.");
        rl.close();
        return;
      }

      // Bước 3: Hỏi người dùng chọn kiểu lấy dữ liệu
      rl.question("Có muốn dùng FILTER để loại bỏ giá trị trống không? (y/n): ", function handleFilterChoice(choice) {
        choice = choice.trim().toLowerCase();

        let formula = "";
        const range = `${column}1:${column}${rowCount}`; // Tạo range cố định

        if (choice === "y" || choice === "yes") {
          // CASE: FILTER với dấu chấm phẩy
          formula = `=FILTER('Raw Data'!${range}; 'Raw Data'!${range}<>"" )`;
        } else if (choice === "n" || choice === "no") {
          // CASE: Truyền thống
          formula = `='Raw Data'!${range}`;
        } else {
          console.log("❌ Vui lòng chọn 'y' hoặc 'n'.");
          rl.close();
          return;
        }

        console.log("\n✅ Công thức Excel được tạo:");
        console.log(formula);
        rl.close();
      });
    });
  });
}

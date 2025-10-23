import readline from "readline";

export default function generateBasicVlookup() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("=== 🧮 Generate Excel VLOOKUP Formula (dấu chấm phẩy) ===");

  rl.question("Sheet hiển thị - Cột chứa dữ liệu đối chiếu (ví dụ: C): ", (displayCol) => {
    displayCol = displayCol.trim().toUpperCase();

    rl.question("Sheet hiển thị - Dòng bắt đầu dữ liệu (ví dụ: 2): ", (displayRowStart) => {
      displayRowStart = parseInt(displayRowStart.trim());

      rl.question("Tên sheet dữ liệu gốc (ví dụ: Master Data): ", (sourceSheet) => {
        sourceSheet = sourceSheet.trim();

        rl.question("Sheet dữ liệu gốc - Cột chứa dữ liệu đối chiếu (ví dụ: F): ", (sourceKeyCol) => {
          sourceKeyCol = sourceKeyCol.trim().toUpperCase();

          rl.question("Sheet dữ liệu gốc - Cột chứa dữ liệu hiển thị (ví dụ: G): ", (sourceValueCol) => {
            sourceValueCol = sourceValueCol.trim().toUpperCase();

            rl.question("Sheet dữ liệu gốc - Dòng bắt đầu dữ liệu (ví dụ: 5): ", (sourceRowStart) => {
              sourceRowStart = parseInt(sourceRowStart.trim());

              rl.question("Sheet dữ liệu gốc - Dòng kết thúc dữ liệu (ví dụ: 1000): ", (sourceRowEnd) => {
                sourceRowEnd = parseInt(sourceRowEnd.trim());

                rl.question("Thứ tự cột hiển thị trong vùng dữ liệu (ví dụ: 2): ", (sourceValueIndex) => {
                  sourceValueIndex = parseInt(sourceValueIndex.trim());

                  // ✅ Sinh công thức VLOOKUP dạng dấu chấm phẩy
                  const formula = `=IFERROR(VLOOKUP(${displayCol}${displayRowStart};'${sourceSheet}'!$${sourceKeyCol}$${sourceRowStart}:$${sourceValueCol}$${sourceRowEnd};${sourceValueIndex};FALSE);"")`;

                  console.log("\n✅ Công thức Excel sinh ra là:\n");
                  console.log(formula);
                  console.log(`\n💡 Gợi ý: Bạn có thể copy công thức xuống các dòng khác để áp dụng tự động.`);

                  rl.close();
                });
              });
            });
          });
        });
      });
    });
  });
}

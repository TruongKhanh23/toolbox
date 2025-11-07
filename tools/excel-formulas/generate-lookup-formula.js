import readline from "readline";

function columnLetterToNumber(letter) {
  // Chuyển từ chữ sang số (A=1, B=2, ..., Z=26, AA=27,...)
  let col = 0;
  for (let i = 0; i < letter.length; i++) {
    col = col * 26 + (letter.charCodeAt(i) - 64);
  }
  return col;
}

export default function generateLookupFormula() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("=== 🧮 Generate Excel Lookup Formula (dấu chấm phẩy) ===");

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

                // Chuyển cột sang số để so sánh vị trí
                const keyColNum = columnLetterToNumber(sourceKeyCol);
                const valueColNum = columnLetterToNumber(sourceValueCol);

                let formula = "";

                if (valueColNum >= keyColNum) {
                  // Nếu cột hiển thị nằm phải cột đối chiếu → VLOOKUP
                  const sourceValueIndex = valueColNum - keyColNum + 1;
                  formula = `=IFERROR(VLOOKUP(${displayCol}${displayRowStart};'${sourceSheet}'!$${sourceKeyCol}$${sourceRowStart}:$${sourceValueCol}$${sourceRowEnd};${sourceValueIndex};FALSE);"")`;
                } else {
                  // Nếu cột hiển thị nằm trái cột đối chiếu → XLOOKUP
                  formula = `=XLOOKUP(${displayCol}${displayRowStart};'${sourceSheet}'!$${sourceKeyCol}$${sourceRowStart}:$${sourceKeyCol}$${sourceRowEnd};'${sourceSheet}'!$${sourceValueCol}$${sourceRowStart}:$${sourceValueCol}$${sourceRowEnd};"")`;
                }

                console.log("\n✅ Công thức Excel sinh ra là:\n");
                console.log(formula);
                console.log("\n💡 Gợi ý: Bạn có thể copy công thức xuống các dòng khác để áp dụng tự động.");

                rl.close();
              });
            });
          });
        });
      });
    });
  });
}

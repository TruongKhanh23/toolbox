import readline from "readline";

export default function generateConditionalFormattingNotValidData() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("1. Nhập tên sheet dữ liệu gốc: ", (sheetInput) => {
    const sheet = sheetInput.trim();

    rl.question("2. Nhập cột dữ liệu gốc (ví dụ T): ", (sourceColInput) => {
      const sourceCol = sourceColInput.trim().toUpperCase();

      rl.question("3. Nhập dòng bắt đầu dữ liệu gốc (ví dụ 5): ", (startRowInput) => {
        const startRow = startRowInput.trim();

        rl.question("4. Nhập dòng kết thúc dữ liệu gốc (ví dụ 30): ", (endRowInput) => {
          const endRow = endRowInput.trim();

          rl.question("5. Nhập cột cần kiểm duyệt (ví dụ N): ", (targetColInput) => {
            const targetCol = targetColInput.trim().toUpperCase();

            rl.question("6. Nhập dòng cần kiểm duyệt bắt đầu (ví dụ 5): ", (targetRowInput) => {
              const targetRow = targetRowInput.trim();

              // Công thức dạng TRUE/FALSE
              const formulaCount = 
                `=COUNTIF('${sheet}'!$${sourceCol}$${startRow}:$${sourceCol}$${endRow}; ` +
                `$${targetCol}${targetRow})=0`;

              // Công thức dạng IF với Valid/Invalid
              const formulaIfValid = 
                `=IF($${targetCol}${targetRow}="";"Invalid";IF(OR($${targetCol}$${targetRow}="";COUNTIF('${sheet}'!$${sourceCol}$${startRow}:$${sourceCol}$${endRow}; ` +
                `$${targetCol}${targetRow})=0);"Invalid";"Valid"))`;

              console.log("\n🎯 Công thức Excel tạo ra (TRUE/FALSE):");
              console.log(formulaCount);

              console.log("\n🎯 Công thức Excel tạo ra (IF Valid/Invalid):");
              console.log(formulaIfValid);

              rl.close();
            });
          });
        });
      });
    });
  });
}

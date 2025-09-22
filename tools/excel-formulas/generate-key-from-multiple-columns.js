import readline from "readline";

export default function generateKeyFromMultipleColumns() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Nhập số cột muốn gộp: ", (numColsInput) => {
    const numCols = parseInt(numColsInput.trim());
    if (isNaN(numCols) || numCols < 1) {
      console.log("Số cột không hợp lệ!");
      rl.close();
      return;
    }

    const columns = [];
    const askColumn = (i) => {
      if (i >= numCols) {
        rl.question("Nhập dòng bắt đầu (ví dụ 6): ", (rowInput) => {
          const row = rowInput.trim();
          // Tạo công thức Excel TEXTJOIN
          const formulaParts = columns.map(col => `${col}${row}`);
          const formula = `=IF(COUNTA(${formulaParts.join(";")})=0;"";TEXTJOIN("-";TRUE;${formulaParts.join(";")}))`;
          console.log("Công thức Excel tạo ra:");
          console.log(formula);
          rl.close();
        });
        return;
      }

      rl.question(`Nhập tên cột thứ ${i + 1} (ví dụ AD): `, (col) => {
        columns.push(col.trim().toUpperCase());
        askColumn(i + 1);
      });
    };

    askColumn(0);
  });
}

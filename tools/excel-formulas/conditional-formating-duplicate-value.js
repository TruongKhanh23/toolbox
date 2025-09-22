import readline from "readline";

export default function conditionalFormatingDuplicateValue() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Nhập cột muốn áp dụng conditional formatting: ", (column) => {
    const col = column.toUpperCase();
    const formula = `=AND(${col}1<>""; COUNTIF($${col}$1:$${col}$1002; ${col}1)>1)`;
    console.log("Công thức Excel được tạo:");
    console.log(formula);
    rl.close();
  });
}
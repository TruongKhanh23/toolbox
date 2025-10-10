import fs from "fs";
import readline from "readline";
import path from "path";
import { fileURLToPath } from "url";

// Lấy đường dẫn file hiện tại
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function generatePriorityNamedFormula() {
  const filePath = path.join(
    __dirname,
    "../../data/excel-formulas/generate-priority-named-formula/input.txt"
  );

  if (!fs.existsSync(filePath)) {
    console.error("File input.txt không tồn tại ở đường dẫn:", filePath);
    return;
  }

  const formulas = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false,
  });

  rl.on("line", (line) => {
    const trimmed = line.trim();
    if (trimmed !== "") {
      formulas.push(trimmed);
    }
  });

  rl.on("close", () => {
    if (formulas.length === 0) {
      console.log("File rỗng, không có công thức nào.");
      return;
    }

    // Tạo công thức IF lồng nhau
    let formulaString = "";
    for (let i = 0; i < formulas.length; i++) {
      if (i === 0) {
        formulaString = `=IF(${formulas[i]}<>""; ${formulas[i]};`;
      } else if (i < formulas.length - 1) {
        formulaString += `\n    IF(${formulas[i]}<>""; ${formulas[i]};`;
      } else {
        formulaString += `\n       ${formulas[i]}` + ")".repeat(formulas.length - 1);
      }
    }

    console.log("Công thức Excel được generate:");
    console.log(formulaString);
  });
}

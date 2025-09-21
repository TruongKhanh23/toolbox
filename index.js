import fs from "fs";
import path from "path";

import findBranchName from "./tools/ca-phe-muoi-chu-long/find-branch-name.js";
import generateExcelFormulaSheetsRows from "./tools/ca-phe-muoi-chu-long/generate-excel-formula-sheets-rows.js";

// Gom các hàm lại thành 1 object, key là số
const functions = {
  1: findBranchName,
  2: generateExcelFormulaSheetsRows,
};

// --- Đọc số từ file arg.txt (đặt cùng cấp index.js) ---
const filePath = path.resolve("./run-function-number.txt");

let arg;
try {
  const fileContent = fs.readFileSync(filePath, "utf-8").trim();
  arg = parseInt(fileContent, 10);
} catch (err) {
  console.error("Không đọc được file arg.txt:", err.message);
  process.exit(1);
}

// --- Chạy function ---
const fn = functions[arg];

if (fn) {
  console.log(`Kết quả từ hàm số ${arg}:`);
  console.log(fn());
} else {
  console.log("Số không hợp lệ. Vui lòng chọn:");
  Object.keys(functions).forEach((key) => {
    console.log(`${key}: ${functions[key].name}`);
  });
}

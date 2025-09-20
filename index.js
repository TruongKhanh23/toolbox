import findBranchName from "./tools/ca-phe-muoi-chu-long/find-branch-name.js";
import generateExcelFormulaSheetsRows from "./tools/ca-phe-muoi-chu-long/generate-excel-formula-sheets-rows.js";

// Gom các hàm lại thành 1 object, key là số
const functions = {
  1: findBranchName,
  2: generateExcelFormulaSheetsRows,
};

// --- Gán số trực tiếp ở đây ---
const arg = 2; // 👉 đổi thành 1 hoặc 2 để chạy hàm tương ứng

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

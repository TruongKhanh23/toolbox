import fs from "fs";
import path from "path";

// --- Import các folder (mỗi folder có index.js xuất default object số → function) ---
import caPheMuoiChuLong from "./tools/ca-phe-muoi-chu-long/index.js";
import excelFormulas from "./tools/excel-formulas/index.js";
import convertTxtToExcel from "./tools/convert-txt-to-excel/index.js";

// --- Object gom các folder ---
const folders = {
  "ca-phe-muoi-chu-long": caPheMuoiChuLong,
  "excel-formulas": excelFormulas,
  "convert-txt-to-excel": convertTxtToExcel,
};

// --- Đọc folder cần chạy ---
const folderFilePath = path.resolve("./run-function-folder.txt");
let folderName;
try {
  folderName = fs.readFileSync(folderFilePath, "utf-8").trim();
} catch (err) {
  console.error("Không đọc được file run-function-folder.txt:", err.message);
  process.exit(1);
}

// --- Lấy object function của folder ---
const folderFns = folders[folderName];
if (!folderFns) {
  console.error(`Folder ${folderName} không tồn tại trong project`);
  process.exit(1);
}

// --- Đọc số hàm cần chạy ---
const fnFilePath = path.resolve("./run-function-number.txt");
let fnNumber;
try {
  fnNumber = parseInt(fs.readFileSync(fnFilePath, "utf-8").trim(), 10);
} catch (err) {
  console.error("Không đọc được file run-function-number.txt:", err.message);
  process.exit(1);
}

// --- Chạy function ---
const fn = folderFns[fnNumber];
if (fn) {
  console.log(`Kết quả từ folder "${folderName}" - hàm số ${fnNumber}:`);
  console.log(fn());
} else {
  console.log(`Số ${fnNumber} trong folder "${folderName}" không hợp lệ.`);
  console.log("Các hàm có sẵn:");
  Object.keys(folderFns).forEach((key) => {
    console.log(`${key}: ${folderFns[key].name}`);
  });
}

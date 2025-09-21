import fs from "fs";
import path from "path";

/**
 * Trả về 1 chuỗi công thức Excel định dạng đẹp (xuống dòng + thụt lề)
 * và đồng thời ghi ra ./output/ca-phe-muoi-chu-long/generate-excel-formula-sheets-rows/output.txt
 *
 * sheets: array of sheet names (["Be_Ca_Transfer", "Be_Duong_Transfer", ...])
 */
export default function generateExcelFormulaSheetsRows() {
  const sheets = [
    "Be_Ca_Transfer",
    "Be_Duong_Transfer",
    "Grab_Transfer",
    "VNPAY_Transfer",
    "ZaloPay_GG_Transfer",
    "ZaloPay_Transfer",
    "XanhSM_Transfer",
  ];
  const rowRef = "ROWS($A$2:A2)";
  const colRef = "COLUMN()-COLUMN($A$2)+1";
  const INDENT = "    ";

  function countExpr(sheet) {
    return `(COUNTA(${sheet}!$A$2:$A$100)-COUNTIF(${sheet}!$A$2:$A$100;""))`;
  }

  // Nếu không có sheets, trả về chuỗi rỗng hợp lệ
  if (!Array.isArray(sheets) || sheets.length === 0) {
    const out = '=""';
    const outputDirEmpty = path.resolve(
      "./output/ca-phe-muoi-chu-long/generate-excel-formula-sheets-rows"
    );
    fs.mkdirSync(outputDirEmpty, { recursive: true });
    fs.writeFileSync(path.join(outputDirEmpty, "output.txt"), out, "utf8");
    return out;
  }

  // Precompute count expressions
  const counts = sheets.map(countExpr);

  // Điều kiện: ROWS <= sum(counts[0..i])
  function conditionFor(i) {
    const upTo = counts.slice(0, i + 1).join("+");
    return `${rowRef} <= (${upTo})`;
  }

  // Row index inside INDEX for sheet i:
  // - i === 0 => ROWS($A$2:A2)
  // - else => ROWS($A$2:A2) - (sum counts of previous sheets)
  function rowIndexFor(i) {
    if (i === 0) return rowRef;
    const prevSum = counts.slice(0, i).join("+");
    return `${rowRef}-(${prevSum})`;
  }

  function indexExprFor(i) {
    const sheet = sheets[i];
    return `INDEX(${sheet}!$A$2:$AE$100; ${rowIndexFor(i)}; ${colRef})`;
  }

  // Xây chuỗi IF lồng nhau cho phần ELSE (bắt đầu từ startIndex)
  function buildNestedElse(startIndex, depth) {
    // base: nếu vượt qua hết sheets -> trả về ""
    if (startIndex >= sheets.length) {
      return INDENT.repeat(depth) + '""';
    }

    const lines = [];
    lines.push(INDENT.repeat(depth) + "IF(");
    lines.push(INDENT.repeat(depth + 1) + conditionFor(startIndex) + ";");
    lines.push(
      INDENT.repeat(depth + 1) +
        `IF(${indexExprFor(startIndex)}=""; ""; ${indexExprFor(startIndex)});`
    );
    // else tiếp theo (đệ quy)
    lines.push(buildNestedElse(startIndex + 1, depth + 1));
    lines.push(INDENT.repeat(depth) + ")");
    return lines.join("\n");
  }

  // Bắt đầu tạo formula: top-level IF dùng condition của sheet[0]
  const lines = [];
  lines.push("=IF(");
  lines.push(INDENT + conditionFor(0) + ";");
  lines.push(INDENT + `IF(${indexExprFor(0)}=""; ""; ${indexExprFor(0)});`);
  // Phần else lồng từ sheet 1
  lines.push(buildNestedElse(1, 1));
  lines.push(")");

  const finalFormula = lines.join("\n");

  // Ghi file
  const outputDir = path.resolve(
    "./output/ca-phe-muoi-chu-long/generate-excel-formula-sheets-rows"
  );
  fs.mkdirSync(outputDir, { recursive: true });
  const outputFile = path.join(outputDir, "output.txt");
  fs.writeFileSync(outputFile, finalFormula, "utf8");

  return finalFormula;
}

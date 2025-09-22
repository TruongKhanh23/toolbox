import readline from "readline";

export default async function combineMultipleTableIntoOne() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (question) => new Promise((resolve) => rl.question(question, resolve));

  const groupCount = parseInt(await ask("Nhập số nhóm cột: "), 10);
  const groups = [];

  for (let i = 0; i < groupCount; i++) {
    console.log(`Nhóm ${i + 1}:`);
    const startCol = (await ask("  Cột bắt đầu (ví dụ AM): ")).toUpperCase();
    const endCol = (await ask("  Cột kết thúc (ví dụ AP): ")).toUpperCase();
    const startRow = await ask("  Dòng bắt đầu (ví dụ 6): ");
    const endRow = await ask("  Dòng kết thúc (ví dụ 300): ");

    groups.push({ startCol, endCol, startRow, endRow });
  }

  const formulas = groups.map(
    (g) =>
      `FILTER(${g.startCol}${g.startRow}:${g.endCol}${g.endRow}; BYROW(${g.startCol}${g.startRow}:${g.endCol}${g.endRow}; LAMBDA(r; SUM(LEN(r))>0)))`
  );

  const resultFormula = `=VSTACK(\n  ${formulas.join(";\n  ")}\n)`;

  rl.close();

  console.log("\nCông thức Excel kết quả:");
  console.log(resultFormula);

  return resultFormula;
}

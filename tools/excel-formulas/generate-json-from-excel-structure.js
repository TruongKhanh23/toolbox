import readline from "readline";

export default function generateExcelJsonFormula() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (q) =>
    new Promise((resolve) => rl.question(q, (ans) => resolve(ans.trim())));

  (async () => {
    console.log("=== TẠO CÔNG THỨC EXCEL XUẤT MẢNG JSON ===");

    // 1️⃣ Hỏi số lượng cột
    const colCount = parseInt(await ask("Nhập số lượng cột: "), 10);

    // 2️⃣ Hỏi tên cột và key JSON
    const cols = [];
    for (let i = 0; i < colCount; i++) {
      const letter = await ask(`Tên cột thứ ${i + 1} (ví dụ: A, B, C...): `);
      const key = await ask(`→ Key name (tên field JSON) cho cột ${letter}: `);
      cols.push({ letter, key });
    }

    // 3️⃣ Dòng bắt đầu và kết thúc
    const startRow = await ask("Nhập dòng dữ liệu bắt đầu (ví dụ: 2): ");
    const endRow = await ask("Nhập dòng dữ liệu kết thúc (ví dụ: 68): ");

    // 4️⃣ Sinh công thức Excel
    const rangeList = cols
      .map((c) => `${c.letter}${startRow}:${c.letter}${endRow}`)
      .join("; ");
    const lambdaParams = cols.map((c) => c.letter.toLowerCase()).join("; ");

    const jsonFields = cols
      .map((c) => `""${c.key}"":""" & ${c.letter.toLowerCase()} & """`)
      .join('","" , "",""'); // Không cần phức tạp, Excel sẽ hiểu nối chuỗi

    // Sinh phần JSON trong LAMBDA
    const jsonInner =
      '"' +
      "{" +
      cols
        .map((c) => `""${c.key}"":""" & ${c.letter.toLowerCase()} & """`)
        .join(",") +
      "}" +
      '"';

    const formula = `="[" & TEXTJOIN(","; TRUE; MAP(${rangeList}; LAMBDA(${lambdaParams}; ${jsonInner}))) & "]"`;

    console.log("\n=== CÔNG THỨC EXCEL SINH MẢNG JSON ===\n");
    console.log(formula);
    console.log(
      "\n💡 Sao chép công thức này vào Excel — Excel 365 hỗ trợ TEXTJOIN + MAP + LAMBDA."
    );
    rl.close();
  })();
}

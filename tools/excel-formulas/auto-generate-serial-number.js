import readline from "readline";

export default async function generateAutoSerialNumberFormula() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Hàm helper để hỏi input
    const ask = (question) => new Promise(resolve => rl.question(question, resolve));

    try {
        const startRow = await ask("1. Số của dòng chứa tiêu đề: ");
        const dataCol = (await ask("2. Cột có dữ liệu: ")).toUpperCase();
        const numberCol = (await ask("3. Cột hiển thị số thứ tự: ")).toUpperCase();

        const formula = `=IF(${dataCol}${startRow}<>""; IF(ISNUMBER(${numberCol}${startRow}); ${numberCol}${startRow}+1; 1); "")`;

        console.log("\nCông thức Excel sinh ra:");
        console.log(formula);
    } finally {
        rl.close();
    }
}

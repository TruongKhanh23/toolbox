import readline from "readline";

export default async function generateExceptionRowFormula() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Hàm helper để hỏi input
    const ask = (question) => new Promise(resolve => rl.question(question, resolve));

    try {
        const dataCol = (await ask("1. Cột có dữ liệu (vd: A, B…): ")).toUpperCase();
        const exceptionInput = await ask("2. Nhập các dòng ngoại lệ (vd: 2,3,4), nếu không có thì để trống: ");
        const exceptions = exceptionInput
            .split(',')
            .map(s => s.trim())
            .filter(Boolean);

        // Xây dựng công thức với dấu chấm phẩy
        let formula = `=AND(TRIM(${dataCol}1)=""; ROW()>1`;
        if (exceptions.length) formula += '; ' + exceptions.map(r => `ROW()<>${r}`).join('; ');
        formula += ')';

        console.log("\nCông thức Excel sinh ra:");
        console.log(formula);
    } finally {
        rl.close();
    }
}
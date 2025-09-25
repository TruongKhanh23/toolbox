import readline from "readline";

export default function conditionalFormattingCellWithoutString() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Nhập ô bắt đầu (ví dụ: D1): ', (cell) => {
    rl.question('Nhập chuỗi điều kiện bắt buộc phải có: ', (text) => {
      rl.question('Nhập dòng ngoại lệ (không áp dụng format, ví dụ: 5 hoặc 5,7,10) hoặc bỏ trống nếu không có: ', (exceptionRows) => {
        let formula;
        if (exceptionRows.trim() === "") {
          // Không có dòng ngoại lệ
          formula = `=AND(${cell}<>""; NOT(ISNUMBER(SEARCH("${text}"; ${cell}))))`;
        } else {
          // Xử lý ngoại lệ: tách thành mảng, tạo điều kiện NOT(ROW()=...)
          const rowsArray = exceptionRows.split(',').map(r => r.trim());
          const exceptionCondition = rowsArray.map(r => `ROW()<>${r}`).join('; ');
          formula = `=AND(${cell}<>""; NOT(ISNUMBER(SEARCH("${text}"; ${cell}))); ${exceptionCondition})`;
        }

        console.log('\nCông thức Conditional Formatting tạo ra:');
        console.log(formula);
        rl.close();
      });
    });
  });
}

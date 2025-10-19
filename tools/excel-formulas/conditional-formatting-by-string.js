import readline from "readline";

export default function conditionalFormattingByString() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Nhập ô bắt đầu (ví dụ: A1): ", (cell) => {
    rl.question("Nhập chuỗi cần nhận diện (ví dụ: Tổng phí ngày): ", (text) => {
      rl.question(
        "Nhập dòng ngoại lệ (không áp dụng format, ví dụ: 5 hoặc 5,7,10) hoặc bỏ trống nếu không có: ",
        (exceptionRows) => {
          let formula;

          if (exceptionRows.trim() === "") {
            // Không có dòng ngoại lệ
            formula = `=ISNUMBER(SEARCH("${text}"; ${cell}))`;
          } else {
            // Có dòng ngoại lệ → tạo điều kiện loại trừ các dòng đó
            const rowsArray = exceptionRows.split(",").map((r) => r.trim());
            const exceptionCondition = rowsArray
              .map((r) => `ROW()<>${r}`)
              .join("; ");
            formula = `=AND(ISNUMBER(SEARCH("${text}"; ${cell})); ${exceptionCondition})`;
          }

          console.log("\nCông thức Conditional Formatting tạo ra:");
          console.log(formula);

          rl.close();
        }
      );
    });
  });
}

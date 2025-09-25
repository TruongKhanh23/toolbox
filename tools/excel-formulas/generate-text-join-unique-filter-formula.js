import readline from "readline";

export default function generateTextJoinUniqueFilterFormula() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const questions = [
    { key: "SourceSheet", question: "Tên sheet dữ liệu gốc: " },
    { key: "DataColumnRef", question: "Sheet dữ liệu gốc: Cột chứa giá trị cần join (vd: E): " },
    { key: "CriteriaColumnRef", question: "Sheet dữ liệu gốc: Cột điều kiện (vd: A): " },
    { key: "CriteriaValue", question: "Sheet hiển thị: Giá trị filter theo cột (vd: B4): " },
    { key: "StartRow", question: "Dòng bắt đầu dữ liệu (vd: 4): " },
    { key: "Delimiter", question: "Ký tự phân cách khi nối chuỗi (vd: \", \"): " },
  ];

  const answers = {};

  function quoteIfString(value) {
    if (!/^".*"$/.test(value) && isNaN(value)) {
      return `"${value}"`;
    }
    return value;
  }

  function toRange(col, startRow) {
    return `${col.toUpperCase()}$${startRow}:${col.toUpperCase()}$1000`;
  }

  function ask(index) {
    if (index === questions.length) {
      const sheet = answers.SourceSheet;
      const dataCol = toRange(answers.DataColumnRef, answers.StartRow);
      const critCol = toRange(answers.CriteriaColumnRef, answers.StartRow);
      const delimiter = quoteIfString(answers.Delimiter);
      const critVal = answers.CriteriaValue;

      const formula = `=TEXTJOIN(${delimiter}; TRUE; UNIQUE(FILTER('${sheet}'!${dataCol}; '${sheet}'!${critCol}=${critVal}; "")))`;

      console.log("\nCông thức Excel tạo ra:\n");
      console.log(formula);
      rl.close();
      return;
    }

    rl.question(questions[index].question, (answer) => {
      answers[questions[index].key] = answer.trim();
      ask(index + 1);
    });
  }

  ask(0);
}

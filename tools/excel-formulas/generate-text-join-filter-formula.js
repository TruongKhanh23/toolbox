import readline from "readline";

export default function generateTextJoinFilterFormula() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const questions = [
    { key: "SourceSheet", question: "Tên sheet dữ liệu: " },
    { key: "DataColumnRef", question: "Cột chứa giá trị cần lấy (vd: C): " },
    { key: "CriteriaColumn1Ref", question: "Cột điều kiện 1 (vd: A): " },
    { key: "CriteriaValue1", question: "Giá trị lọc theo cột 1 (vd: C2): " },
    { key: "CriteriaColumn2Ref", question: "Cột điều kiện 2 (vd: B): " },
    { key: "CriteriaValue2", question: "Giá trị lọc theo cột 2 (vd: Programming_Language): " },
    { key: "Delimiter", question: "Ký tự phân cách khi nối chuỗi (vd: \", \"): " },
  ];

  const answers = {};

  function quoteIfString(value) {
    if (!/^".*"$/.test(value) && isNaN(value)) {
      return `"${value}"`;
    }
    return value;
  }

  function toRange(col) {
    return `$${col.toUpperCase()}$2:$${col.toUpperCase()}$5000`;
  }

  function ask(index) {
    if (index === questions.length) {
      const sheet = answers.SourceSheet;
      const dataCol = toRange(answers.DataColumnRef);
      const critCol1 = toRange(answers.CriteriaColumn1Ref);
      const critCol2 = toRange(answers.CriteriaColumn2Ref);
      const delimiter = quoteIfString(answers.Delimiter);
      const critVal1 = `TRIM(${answers.CriteriaValue1})`;
      const critVal2 = quoteIfString(answers.CriteriaValue2);

      const formula = `=IFERROR(\n  TEXTJOIN(${delimiter}; TRUE;\n    FILTER(\n      '${sheet}'!${dataCol};\n      (TRIM('${sheet}'!${critCol1})=${critVal1}) *\n      (TRIM('${sheet}'!${critCol2})=${critVal2})\n    )\n  );\n  ""\n)`;

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

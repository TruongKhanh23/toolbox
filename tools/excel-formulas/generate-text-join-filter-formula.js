import readline from "readline";

export default function generateTextJoinFilterFormula() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const questions = [
    { key: "SourceSheet", question: "Tên sheet dữ liệu: " },
    { key: "DataColumnRef", question: "Cột chứa giá trị cần lấy (vd: C:C): " },
    { key: "CriteriaColumn1Ref", question: "Cột điều kiện 1 (vd: A:A): " },
    { key: "CriteriaValue1", question: "Giá trị lọc theo cột 1 (vd: C2): " },
    { key: "CriteriaColumn2Ref", question: "Cột điều kiện 2 (vd: B:B): " },
    { key: "CriteriaValue2", question: "Giá trị lọc theo cột 2 (vd: \"Programming_Language\"): " },
    { key: "DefaultValue", question: "Giá trị trả về nếu không tìm thấy (vd: \"N/A\"): " },
    { key: "Delimiter", question: "Ký tự phân cách khi nối chuỗi (vd: \", \"): " },
  ];

  const answers = {};

  function quoteIfString(value) {
    // Nếu chưa có dấu " ở đầu cuối thì thêm
    if (!/^".*"$/.test(value) && isNaN(value)) {
      return `"${value}" `;
    }
    return value;
  }

  function ask(index) {
    if (index === questions.length) {
      // Chuẩn hóa chữ hoa cột
      const dataCol = answers.DataColumnRef.toUpperCase();
      const critCol1 = answers.CriteriaColumn1Ref.toUpperCase();
      const critCol2 = answers.CriteriaColumn2Ref.toUpperCase();

      const formula = `=TEXTJOIN(${quoteIfString(answers.Delimiter)}; TRUE; FILTER('${answers.SourceSheet}'!${dataCol}; ('${answers.SourceSheet}'!${critCol1}=${answers.CriteriaValue1})*('${answers.SourceSheet}'!${critCol2}=${quoteIfString(answers.CriteriaValue2)}); ${quoteIfString(answers.DefaultValue)}))`;

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

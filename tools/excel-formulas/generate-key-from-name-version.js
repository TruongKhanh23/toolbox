import readline from "readline";

export default function generateKeyFromNameVersion() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Nhập cột name (ví dụ AD): ", (nameCol) => {
    rl.question("Nhập cột version (ví dụ AE): ", (versionCol) => {
      rl.question("Nhập số dòng (ví dụ 6): ", (row) => {
        const name = nameCol.trim().toUpperCase();
        const version = versionCol.trim().toUpperCase();
        const key = `=IF(${name}${row}="";"";${name}${row} & IF(${version}${row}="";"";" v." & ${version}${row}))`;
        console.log("Kết quả:");
        console.log(key);
        
        rl.close();
      });
    });
  });
}

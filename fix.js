import {readFileSync, writeFileSync} from "fs"


let code = readFileSync("./dist/cjs/index.js", "utf-8")
console.log(code)

code = code.replace("exports.default = sdate;", "module.exports = sdate;");

writeFileSync("./dist/cjs/index.js", code, "utf-8")
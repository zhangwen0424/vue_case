const infoCollector = require("./infoCollector");
const tplReplacer = require("./tplReplacer");

// 生成新组件并更新组件信息
async function run() {
  const meta = await infoCollector();
  tplReplacer(meta);
}

// 根据组件目录生成组件信息
async function init() {
  tplReplacer();
}

let argvs = process.argv.slice(2);
if (argvs[0] == "init") {
  init(); // 不生成新组件
} else {
  run(); // 生成新组件
}

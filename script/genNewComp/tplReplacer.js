const fs = require("fs-extra");
const handlebars = require("handlebars");
const { resolve } = require("path");

const getTplFilePath = (meta) => ({
  // docs 目录
  readme: {
    from: "./.template/docs/README.md.tpl",
    to: `../../packages/${meta.compName}/docs/README.md`,
  },
  demo: {
    from: "./.template/docs/demo.vue.tpl",
    to: `../../packages/${meta.compName}/docs/demo.vue`,
  },
  // src 目录
  vue: {
    from: "./.template/src/index.vue.tpl",
    to: `../../packages/${meta.compName}/src/index.vue`,
  },
  // 根目录
  install: {
    from: "./.template/index.ts.tpl",
    to: `../../packages/${meta.compName}/index.ts`,
  },
});

// 根据模板生成组件目录
const compFilesTplReplacer = (meta) => {
  const filePaths = getTplFilePath(meta);
  Object.keys(filePaths).forEach((key) => {
    const fileTpl = fs.readFileSync(
      resolve(__dirname, filePaths[key].from),
      "utf-8"
    );
    const fileContent = handlebars.compile(fileTpl)(meta);
    fs.outputFile(resolve(__dirname, filePaths[key].to), fileContent, (err) => {
      if (err) console.log(err);
    });
  });
};

// 读取 packages/list.json 并更新
const listJsonTplReplacer = (meta) => {
  const listFilePath = "../../packages/list.json";
  const listFileTpl = fs.readFileSync(
    resolve(__dirname, listFilePath),
    "utf-8"
  );
  let listFileContent = JSON.parse(listFileTpl);
  const listDir = fs.readdirSync(resolve(__dirname, "../../packages"));
  listFileContent = listFileContent.filter((l) => {
    return listDir.includes(l.compName);
  });
  meta && listFileContent.push(meta);
  const newListFileContentFile = JSON.stringify(listFileContent, null, 2);
  fs.writeFile(
    resolve(__dirname, listFilePath),
    newListFileContentFile,
    (err) => {
      if (err) console.log(err);
    }
  );
  return listFileContent;
};

// 更新 router.ts
const routerTplReplacer = (listFileContent) => {
  const routerFileFrom = "./.template/router.ts.tpl";
  const routerFileTo = "../../src/routers/component.ts";
  const routerFileTpl = fs.readFileSync(
    resolve(__dirname, routerFileFrom),
    "utf-8"
  );

  const routerMeta = {
    routes: listFileContent.map((comp) => {
      return `{
        title: '${comp.compZhName}',
        name: '${comp.compName}',
        path: '/components/${comp.compClassName}',
        component: () => import('@packages/${comp.compName}/docs/README.md'),
      }`;
    }),
  };
  const routerFileContent = handlebars.compile(routerFileTpl, {
    noEscape: true,
  })(routerMeta);
  fs.outputFile(resolve(__dirname, routerFileTo), routerFileContent, (err) => {
    if (err) console.log(err);
  });
};

// 更新 install.ts
const installTsTplReplacer = (listFileContent) => {
  const installFileFrom = "./.template/install.ts.tpl";
  const installFileTo = "../../packages/index.ts"; // 这里没有写错，别慌
  const installFileTpl = fs.readFileSync(
    resolve(__dirname, installFileFrom),
    "utf-8"
  );
  const installMeta = {
    importPlugins: listFileContent
      .map(
        ({ compName }) => `import { ${compName}Plugin } from './${compName}';`
      )
      .join("\n"),
    installPlugins: listFileContent
      .map(({ compName }) => `${compName}Plugin.install?.(app);`)
      .join("\n    "),
    exportPlugins: listFileContent
      .map(({ compName }) => `export * from './${compName}'`)
      .join("\n"),
  };
  const installFileContent = handlebars.compile(installFileTpl, {
    noEscape: true,
  })(installMeta);
  fs.outputFile(
    resolve(__dirname, installFileTo),
    installFileContent,
    (err) => {
      if (err) console.log(err);
    }
  );
};

module.exports = (meta) => {
  meta && compFilesTplReplacer(meta);
  const listFileContent = listJsonTplReplacer(meta);
  routerTplReplacer(listFileContent);
  installTsTplReplacer(listFileContent);
  if (meta) {
    console.log(`组件新建完毕，请前往 packages/${meta.compName} 目录进行开发`);
  } else {
    console.log(`组件目录信息初始化完毕！`);
  }
};

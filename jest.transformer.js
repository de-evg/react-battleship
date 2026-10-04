// Трансформер Jest на базе уже установленного TypeScript.
// Нужен, потому что @babel/preset-typescript в проект не установлен,
// а Vite для сборки использует esbuild (Jest его не видит).
const ts = require("typescript");

module.exports = {
  process(sourceText, sourcePath) {
    const { outputText } = ts.transpileModule(sourceText, {
      fileName: sourcePath,
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        isolatedModules: true,
        sourceMap: true,
      },
    });

    return { code: outputText };
  },
};

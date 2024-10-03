import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,  // Распаковать глобальные переменные
        // Можете добавить свои глобальные переменные здесь, если нужно
        process: "readonly", // Добавьте это для определения `process`

      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];

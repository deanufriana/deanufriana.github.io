import js from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import globals from "globals";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginVue.configs["flat/recommended"],
  ...eslintPluginAstro.configs["flat/recommended"],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/max-attributes-per-line": [
        "warn",
        {
          singleline: { max: 1 },
          multiline: { max: 1 },
        },
      ],
      "vue/html-indent": ["warn", 2],
    },
  },
  {
    ignores: ["dist/", ".astro/", "node_modules/", "*.config.cjs", "*.config.js"],
  },
  eslintPluginPrettierRecommended,
);

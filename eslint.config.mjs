import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  nextPlugin.configs["core-web-vitals"],
  {
    // Configuración específica para archivos de Node.js como babel.config.js
    files: ["babel.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: "commonjs", // Asegura que se reconoce la sintaxis de CommonJS
    },
  },  
  {
    files: ["next-env.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },    
  },
  {
    // Configuraciones base para todos los archivos
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: "detect", // Le dice al plugin que detecte la versión de React
      },
    },
    rules: {
      // Deshabilita la regla `react/react-in-jsx-scope` para JSX Runtime
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      'react/jsx-uses-react': 'off', // Also disable this related rule      
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-img-element': 'off',
      '@next/next/no-duplicate-head': 'off',
      'no-unused-vars': 'off',

      // Corrige el error de 'error' is of type 'unknown'
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "ignoreRestSiblings": true,
          "caughtErrors": "all",
          "caughtErrorsIgnorePattern": "^_",
        },
      ],
    },
  },
];
import { fileURLToPath } from "url"
import { dirname } from "path"
import eslintPluginReact from "eslint-plugin-react"
import eslintPluginReactHooks from "eslint-plugin-react-hooks"
import eslintPluginTypeScript from "@typescript-eslint/eslint-plugin"
import eslintParserTypeScript from "@typescript-eslint/parser"
import eslintPluginNext from "@next/eslint-plugin-next"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const eslintConfig = [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: eslintParserTypeScript,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": eslintPluginTypeScript,
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      "@next/next": eslintPluginNext,
    },
    rules: {
      // ✅ Apply Next.js recommended rules
      ...eslintPluginNext.configs["core-web-vitals"].rules,

      // React rules
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/prop-types": "off", // We use TypeScript for type checking
      "react/jsx-uses-react": "off", // Not needed with new JSX transform

      // TypeScript rules
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",

      // General rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always"],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]

export default eslintConfig

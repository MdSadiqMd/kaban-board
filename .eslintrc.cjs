const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true
  },
  plugins: [
    "@typescript-eslint",
    "@MdSadiqMd/use-client-t3",
  ],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked"
  ],
  rules: {
    "@MdSadiqMd/use-client-t3/no-top-level-use-client": "error",
    "@MdSadiqMd/use-client-t3/no-event-handlers-in-client-props": "error",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        "prefer": "type-imports",
        "fixStyle": "inline-type-imports"
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": {
          "attributes": false
        }
      }
    ]
  }
};

module.exports = config;

module.exports = {
	env: {
		es2022: true,
		node: true
	},
	extends: [
		"eslint:recommended",
		"plugin:eslint-comments/recommended",
		"plugin:typescript-sort-keys/recommended",
		"plugin:n/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
		"plugin:jsx-a11y/recommended",
		"plugin:perfectionist/recommended-natural",
		"plugin:@typescript-eslint/recommended",
		"next/core-web-vitals",
		"plugin:regexp/recommended",
		"prettier"
	],
	overrides: [
		{
			extends: ["plugin:@typescript-eslint/strict", "plugin:@typescript-eslint/stylistic"],
			files: ["**/*.ts"],
			parser: "@typescript-eslint/parser",
			rules: {
				"logical-assignment-operators": [
					"error",
					"always",
					{ enforceForIfStatements: true }
				],
				"operator-assignment": "error"
			}
		},
		{
			excludedFiles: ["**/*.md/*.ts"],
			extends: [
				"plugin:@typescript-eslint/strict-type-checked",
				"plugin:@typescript-eslint/stylistic-type-checked"
			],
			files: ["**/*.ts"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: "./tsconfig.eslint.json"
			},
			rules: {
				"@typescript-eslint/await-thenable": "off",
				"@typescript-eslint/consistent-type-definitions": ["error", "type"],
				"@typescript-eslint/explicit-function-return-type": "error",
				"@typescript-eslint/no-explicit-any": "error",
				"@typescript-eslint/no-floating-promises": "off",
				"@typescript-eslint/no-misused-promises": "off",
				"@typescript-eslint/no-non-null-assertion": "error",
				"@typescript-eslint/no-unnecessary-condition": [
					"error",
					{
						allowConstantLoopConditions: true
					}
				],
				"@typescript-eslint/prefer-for-of": "off",
				"@typescript-eslint/no-unused-vars": "off",
				"@typescript-eslint/padding-line-between-statements": [
					"error",
					{ blankLine: "always", next: "*", prev: ["const", "let", "var"] },
					{
						blankLine: "any",
						next: ["const", "let", "var"],
						prev: ["const", "let", "var"]
					},
					{ blankLine: "always", next: "*", prev: "directive" },
					{ blankLine: "any", next: "directive", prev: "directive" },
					{ blankLine: "always", next: "*", prev: "expression" },
					{ blankLine: "any", next: "break", prev: "expression" }
				],
				"@typescript-eslint/prefer-nullish-coalescing": [
					"error",
					{ ignorePrimitives: true }
				],
				curly: "error",
				"deprecation/deprecation": "error",
				"n/no-missing-import": "off"
			}
		},
		{
			excludedFiles: ["package.json"],
			extends: ["plugin:jsonc/recommended-with-json"],
			files: ["*.json", "*.jsonc"],
			parser: "jsonc-eslint-parser",
			rules: {
				"jsonc/no-comments": "off",
				"jsonc/sort-keys": "error"
			}
		},
		{
			files: ["*.jsonc"],
			rules: {
				"jsonc/no-comments": "off"
			}
		},
		{
			files: ["**/*.test.ts"],
			excludedFiles: ["__tests__"],
			rules: {
				// These on-by-default rules aren't useful in test files.
				"@typescript-eslint/no-unsafe-assignment": "off",
				"@typescript-eslint/no-unsafe-call": "off",
				"@typescript-eslint/no-unsafe-member-access": "off",
				"@typescript-eslint/no-explicit-any": "off",
				"@typescript-eslint/no-non-null-assertion": "off"
			}
		},
		{
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking"
			],
			files: ["**/*.{ts,tsx}"],
			parserOptions: {
				tsconfigRootDir: __dirname,
				project: ["./tsconfig.json"]
			},
			rules: {
				// I only disabled these so that we wouldn't see later rules
				// show up in earlier files... Don't copy these disables! 😉
				"@typescript-eslint/await-thenable": "off",
				"@typescript-eslint/no-floating-promises": "off",
				"@typescript-eslint/no-misused-promises": "off",
				"@typescript-eslint/no-unused-vars": "off",
				"@typescript-eslint/explicit-function-return-type": "error",
				"react-hooks/exhaustive-deps": "off",
				"@typescript-eslint/no-explicit-any": "error",
				"@typescript-eslint/no-non-null-assertion": "error",
				"@typescript-eslint/consistent-type-definitions": ["error", "type"],
				"@typescript-eslint/padding-line-between-statements": [
					"error",
					{ blankLine: "always", prev: ["const", "let", "var"], next: "*" },
					{
						blankLine: "any",
						prev: ["const", "let", "var"],
						next: ["const", "let", "var"]
					},
					{ blankLine: "always", prev: "directive", next: "*" },
					{ blankLine: "any", prev: "directive", next: "directive" },
					{ blankLine: "always", prev: "expression", next: "*" },
					{ blankLine: "any", prev: "expression", next: "break" }
					// { blankLine: "any", prev: "expression", next: "" }
				],
				"typescript-sort-keys-interface": "off",
				"react/prop-types": "error",
				curly: "error",
				"jsx-a11y/no-autofocus": "off"
			}
		},
		{
			files: "*.json",
			parser: "jsonc-eslint-parser",
			rules: {
				"jsonc/sort-keys": "error"
			},
			extends: ["plugin:jsonc/recommended-with-json"]
		}
	],
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint",
		"deprecation",
		"jsdoc",
		"no-only-tests",
		"perfectionist",
		"regexp",
		"react",
		"react-hooks",
		"typescript-sort-keys"
	],
	reportUnusedDisableDirectives: true,
	root: true,
	rules: {
		// These off/less-strict-by-default rules work well for this repo and we like them on.
		"@typescript-eslint/no-unused-vars": ["error", { caughtErrors: "all" }],
		// Stylistic concerns that don't interfere with Prettier
		"@typescript-eslint/padding-line-between-statements": [
			"error",
			{ blankLine: "always", next: "*", prev: "block-like" }
		],

		"eslint-comments/disable-enable-pair": "off",
		// These on-by-default rules don't work well for this repo and we like them off.
		"no-case-declarations": "off",
		"no-constant-condition": "off",
		"no-inner-declarations": "off",

		"no-mixed-spaces-and-tabs": "off",
		"no-only-tests/no-only-tests": "error",
		"perfectionist/sort-classes": "off",
		"perfectionist/sort-objects": "off",
		"perfectionist/sort-object-types": "off",
		"n/no-unpublished-import": [
			"error",
			{
				allowModules: ["supertest", "dotenv", "chance", "envalid"]
			}
		],
		"object-shorthand": "error",
		"typescript-sort-keys/interface": "off",
		"n/no-missing-import": "off",
		"n/no-extraneous-import": [
			"error",
			{
				allowModules: ["cropperjs"],
				resolvePaths: []
			}
		]
	},
	settings: {
		react: {
			version: "detect"
		}
	}
};

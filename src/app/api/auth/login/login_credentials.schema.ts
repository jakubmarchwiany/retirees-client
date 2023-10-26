import { JSONSchemaType } from "ajv";

type LoginData = {
	username: string;
	password: string;
	rememberMe: boolean;
};

const loginDataSchema: JSONSchemaType<LoginData> = {
	type: "object",
	properties: {
		username: { type: "string" },
		password: { type: "string" },
		rememberMe: { type: "boolean" }
	},
	required: ["username", "password", "rememberMe"],
	additionalProperties: false
};

export { loginDataSchema };
export type { LoginData };

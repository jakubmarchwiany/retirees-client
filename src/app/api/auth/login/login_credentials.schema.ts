import { JSONSchemaType } from "ajv";

type LoginData = {
	username: string;
	password: string;
	rememberMe: boolean;
};

const loginDataSchema: JSONSchemaType<LoginData> = {
	additionalProperties: false,
	properties: {
		password: { type: "string" },
		rememberMe: { type: "boolean" },
		username: { type: "string" }
	},
	required: ["username", "password", "rememberMe"],
	type: "object"
};

export { loginDataSchema };
export type { LoginData };

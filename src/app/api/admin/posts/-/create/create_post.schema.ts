import { JSONSchemaType } from "ajv";

type CreatePostData = {
	content: string;
	endDate: null | string;
	startDate: string;
	title: string;
};

const createPostDataSchema: JSONSchemaType<CreatePostData> = {
	properties: {
		content: { minLength: 10, type: "string" },
		endDate: {
			oneOf: [
				{ minLength: 10, type: "string" },
				{ nullable: true, type: "null" }
			],
			type: ["string", "null"]
		},
		startDate: { minLength: 10, type: "string" },
		title: { minLength: 3, type: "string" }
	},
	required: ["title", "startDate", "endDate", "content"],
	type: "object"
};

export { createPostDataSchema };
export type { CreatePostData };

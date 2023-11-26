import { JSONSchemaType } from "ajv";

type CreatePostData = {
	content: string;
	endDate: null | string;
	startDate: string;
	title: string;
};

const createPostDataSchema: JSONSchemaType<CreatePostData> = {
	type: "object",
	properties: {
		title: { type: "string", minLength: 3 },
		startDate: { type: "string", minLength: 10 },
		endDate: {
			type: ["string", "null"],
			oneOf: [
				{ type: "string", minLength: 10 },
				{ type: "null", nullable: true }
			]
		},
		content: { type: "string", minLength: 10 }
	},
	required: ["title", "startDate", "endDate", "content"]
};

export { createPostDataSchema };
export type { CreatePostData };

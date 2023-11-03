import { JSONSchemaType } from "ajv";

type CreatePostData = {
	title: string;
	startDate: string;
	endDate?: string;
	content: string;
};

const createPostDataSchema: JSONSchemaType<CreatePostData> = {
	type: "object",
	properties: {
		title: { type: "string", minLength: 3 },
		startDate: { type: "string", minLength: 3 },
		endDate: { type: "string", minLength: 3, nullable: true },
		content: { type: "string", minLength: 10 }
	},
	required: ["title", "startDate", "content"]
};

export { createPostDataSchema };
export type { CreatePostData };

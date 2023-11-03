import { validateObject } from "@/middlewares/validate_object";
import { createResponse } from "@/utils/create_response";
import { getErrorMessage } from "@/utils/get_error_message";
import { NextResponse } from "next/server";

import { CreatePostData, createPostDataSchema } from "./create_post.schema";

export const config = {
	api: {
		bodyParser: false
	}
};

export async function POST(req: Request): Promise<NextResponse> {
	try {
		const data = await req.formData();

		const image = data.get("image") as File | null;

		const post = {
			title: data.get("title"),
			startDate: data.get("startDate"),
			endDate: data.get("endDate"),
			content: data.get("content")
		};

		const { title, startDate, endDate, content } = validateObject<CreatePostData>(
			post,
			createPostDataSchema
		);

		if (image !== null) {
			const bytes = await image.arrayBuffer();

			const buffer = Buffer.from(bytes);

			console.log(buffer);
		}

		return createResponse(200, "Udało się dodać post");
	} catch (error) {
		return createResponse(400, getErrorMessage(error));
	}
}

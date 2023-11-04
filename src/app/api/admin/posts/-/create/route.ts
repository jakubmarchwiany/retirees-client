import { validateObject } from "@/middlewares/validate_object";
import { Post } from "@/types/post.type";
import { createResponse } from "@/utils/create_response";
import {
	downloadPostsFromBucket,
	savePostsToBucket,
	uploadPostImageToBucket
} from "@/utils/google_bucket.api";
import { NextResponse } from "next/server";

import { CreatePostData, createPostDataSchema } from "./create_post.schema";

export async function POST(req: Request): Promise<NextResponse> {
	try {
		const data = await req.formData();

		const file = data.get("file") as File | null;

		const dataToCheck = {
			title: data.get("title"),
			startDate: data.get("startDate"),
			endDate: data.get("endDate") === null ? undefined : data.get("endDate"),
			content: data.get("content")
		};

		const { title, startDate, endDate, content } = validateObject<CreatePostData>(
			dataToCheck,
			createPostDataSchema
		);

		const postsData = await downloadPostsFromBucket();

		let newPost: Post;

		if (file !== null) {
			const bytes = await file.arrayBuffer();

			const buffer = Buffer.from(bytes);

			const imageName = await uploadPostImageToBucket(buffer);

			newPost = { title, startDate, endDate, imageName, content };
		} else {
			newPost = { title, startDate, endDate, content };
		}

		postsData.unshift(newPost);

		await savePostsToBucket(postsData);

		return createResponse(200, "Udało się dodać post");
	} catch (error) {
		return createResponse(400, "Nie udało się dodać posta");
	}
}

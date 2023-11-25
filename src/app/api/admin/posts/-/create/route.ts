import { db } from "@/app/api/db/firebase";
import { validateObject } from "@/app/api/middlewares/validate_object";
import { createResponse } from "@/app/api/utils/create_response";
import { uploadPostImageToBucket } from "@/app/api/utils/google_bucket.api";
import { addDoc, collection } from "firebase/firestore";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { CreatePostData, createPostDataSchema } from "./create_post.schema";

export async function POST(req: Request): Promise<NextResponse> {
	try {
		const formData = await req.formData();

		const postToCheck = {
			title: formData.get("title"),
			startDate: formData.get("startDate"),
			endDate: formData.get("endDate"),
			content: formData.get("content")
		};

		const { content, endDate, startDate, title } = validateObject<CreatePostData>(
			postToCheck,
			createPostDataSchema
		);

		let newPost;

		if (formData.has("file")) {
			const file = formData.get("file") as File;

			const bytes = await file.arrayBuffer();

			const buffer = Buffer.from(bytes);

			const image = await uploadPostImageToBucket(buffer);

			newPost = { title, startDate, endDate, image, content };
		} else {
			newPost = { title, startDate, endDate, content, image: null };
		}

		await addDoc(collection(db, "posts"), newPost);

		revalidateTag("posts_update");

		return createResponse(200, "Udało się dodać post");
	} catch (error) {
		console.log(error);

		return createResponse(400, "Nie udało się dodać posta");
	}
}

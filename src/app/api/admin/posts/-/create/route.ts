import { addPrefix, db } from "@/app/api/db/firebase";
import { validateObject } from "@/app/api/middlewares/validate_object";
import { uploadPostImageToBucket } from "@/app/api/utils/google_bucket.api";
import { addDoc, collection } from "firebase/firestore";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { CreatePostData, createPostDataSchema } from "./create_post.schema";

export async function POST(req: Request): Promise<any> {
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

		const newPost = {
			title,
			startDate: new Date(startDate),
			endDate: endDate !== null ? new Date(endDate) : null,
			content,
			image: null as unknown as string,
			createdDate: new Date()
		};

		if (formData.has("file")) {
			const file = formData.get("file") as File;

			const bytes = await file.arrayBuffer();

			const buffer = Buffer.from(bytes);

			const image = await uploadPostImageToBucket(buffer);

			newPost.image = image;
		}

		await addDoc(collection(db, addPrefix("posts")), newPost);

		revalidateTag("posts_update");

		return NextResponse.json(
			{ message: "Udało się dodać post" },
			{
				status: 200
			}
		);
		// return createResponse(200, "Udało się dodać post");
	} catch (error) {
		console.log(error);

		return NextResponse.json(
			{ message: "Nie udało się dodać posta" },
			{
				status: 400
			}
		);
	}
}

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
			content: formData.get("content"),
			endDate: formData.get("endDate"),
			startDate: formData.get("startDate"),
			title: formData.get("title")
		};

		const { content, endDate, startDate, title } = validateObject<CreatePostData>(
			postToCheck,
			createPostDataSchema
		);

		const newPost = {
			content,
			createdDate: new Date(),
			endDate: endDate !== null ? new Date(endDate) : null,
			image: null as unknown as string,
			startDate: new Date(startDate),
			title
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

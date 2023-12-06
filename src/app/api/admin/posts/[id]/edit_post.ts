import { addPrefix, db } from "@/app/api/db/firebase";
import { validate } from "@/app/api/middlewares/validate.middleware";
import { createResponse } from "@/app/api/utils/create_response";
import { doc, updateDoc } from "firebase/firestore";
import { revalidateTag } from "next/cache";

import { CreatePostData, createPostDataSchema } from "../-/create/create_post.schema";

export async function EditPost(req: Request, { params }: { params: { id: string } }): Promise<any> {
	try {
		const { id } = params;

		const { title, startDate, endDate, content } = await validate<CreatePostData>(
			req,
			createPostDataSchema
		);

		const postToUpdate = doc(db, addPrefix("posts"), id);

		const updatedPost = {
			content,
			endDate: endDate !== null ? new Date(endDate) : null,
			startDate: new Date(startDate),
			title
		};

		await updateDoc(postToUpdate, updatedPost);

		revalidateTag("posts_update");

		return createResponse(200, "Udało się edytować post");
	} catch (error) {
		console.log(error);

		return createResponse(400, "Nie udało się edytować postu");
	}
}

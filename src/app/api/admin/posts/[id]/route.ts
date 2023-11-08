import { validate } from "@/app/api/middlewares/validate.middleware";
import { createResponse } from "@/app/api/utils/create_response";
import { downloadPostsFromBucket, savePostsToBucket } from "@/app/api/utils/google_bucket.api";
import { PostType } from "@/types/post.type";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { CreatePostData, createPostDataSchema } from "../-/create/create_post.schema";

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
): Promise<NextResponse> {
	try {
		const { id } = params;

		const { title, startDate, endDate, content } = await validate<CreatePostData>(
			req,
			createPostDataSchema
		);

		const postsData = await downloadPostsFromBucket();

		const postToUpdateIndex = postsData.findIndex((p) => p.id == id);

		if (postToUpdateIndex !== 1) {
			const updatePost: PostType = {
				id,
				title,
				startDate,
				content,
				...(endDate !== undefined && { endDate }),
				...(postsData[postToUpdateIndex]?.image !== undefined && {
					image: postsData[postToUpdateIndex]?.image
				})
			};

			postsData[postToUpdateIndex] = updatePost;

			await savePostsToBucket(postsData);

			revalidateTag("posts_update");

			return createResponse(200, "Udało się edytować post");
		} else {
			throw Error("Post który chcesz edytować nie istnieje");
		}
	} catch (error) {
		console.log(error);

		return createResponse(400, "Nie udało się edytować postu");
	}
}

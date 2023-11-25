import { createResponse } from "@/app/api/utils/create_response";
import {
	deletePostImageFromBucket,
	downloadPostsFromBucket,
	savePostsToBucket
} from "@/app/api/utils/google_bucket.api";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function DeletePost(
	req: Request,
	{ params }: { params: { id: string } }
): Promise<NextResponse> {
	try {
		const { id } = params;

		const postsData = await downloadPostsFromBucket();

		const postToDelate = postsData.find((p) => p.id === id);

		if (postToDelate !== undefined) {
			const updatedPosts = postsData.filter((p) => p.id !== id);

			console.error(postToDelate);

			if (postToDelate.image !== undefined) {
				await deletePostImageFromBucket(postToDelate.image);
			}

			await savePostsToBucket(updatedPosts);

			revalidateTag("posts_update");

			return createResponse(200, "Udało się usunąć post");
		} else {
			return createResponse(400, "Post który chcesz usunąć nie istnieje");
		}
	} catch (error) {
		console.log(error);

		return createResponse(400, "Nie udało się usunąć postu");
	}
}

import { addPrefix, db } from "@/app/api/db/firebase";
import { createResponse } from "@/app/api/utils/create_response";
import { deletePostImageFromBucket } from "@/app/api/utils/google_bucket.api";
import { PostFirebaseType } from "@/types/post_firebase.type";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function DeletePost(
	req: Request,
	{ params }: { params: { id: string } }
): Promise<any> {
	try {
		const { id } = params;

		const postToDeleteRef = doc(db, addPrefix("posts"), id);

		const postToDeleteSnap = await getDoc(postToDeleteRef);

		if (postToDeleteSnap.exists()) {
			const postToDelate = postToDeleteSnap.data() as PostFirebaseType;

			if (postToDelate.image !== null) {
				await deletePostImageFromBucket(postToDelate.image);
			}

			await deleteDoc(postToDeleteRef);

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

import { PostType } from "@/types/post.type";
import { PostFirebaseType } from "@/types/post_firebase.type";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";

import { addPrefix, db } from "../firebase";

const { GOOGLE_BUCKET_IMAGES_URL } = process.env;

export async function getPost(postId: string): Promise<PostType | null> {
	const postRef = doc(db, addPrefix("posts"), postId);

	const postSnap = await getDoc(postRef);

	if (postSnap.exists()) {
		const postFb = postSnap.data() as PostFirebaseType;

		return {
			content: postFb.content,
			createdDate: postFb.createdDate.toDate().toString(),
			endDate: postFb.endDate !== null ? postFb.endDate.toDate().toString() : null,
			id: postSnap.id,
			image: postFb.image !== null ? GOOGLE_BUCKET_IMAGES_URL + postFb.image : null,
			startDate: postFb.startDate.toDate().toString(),
			title: postFb.title
		};
	} else {
		return null;
	}
}

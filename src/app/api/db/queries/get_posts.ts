import { PostType } from "@/types/post.type";
import { PostFirebaseType } from "@/types/post_firebase.type";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { addPrefix, db } from "../firebase";

const { GOOGLE_BUCKET_IMAGES_URL } = process.env;

export async function getPosts(): Promise<PostType[]> {
	const queryHandler = query(collection(db, addPrefix("posts")), orderBy("createdDate", "desc"));

	const posts = await getDocs(queryHandler);

	const validPosts: PostType[] = [];

	posts.forEach((doc) => {
		const postFb = doc.data() as PostFirebaseType;

		validPosts.push({
			content: postFb.content,
			createdDate: postFb.createdDate.toDate().toString(),
			endDate: postFb.endDate !== null ? postFb.endDate.toDate().toString() : null,
			id: doc.id,
			image: postFb.image !== null ? GOOGLE_BUCKET_IMAGES_URL + postFb.image : null,
			startDate: postFb.startDate.toDate().toString(),
			title: postFb.title
		});
	});

	return validPosts;
}

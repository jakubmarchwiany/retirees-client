import { PostType } from "@/types/post.type";
import { Timestamp, collection, getDocs, orderBy, query } from "firebase/firestore";

import { addPrefix, db } from "../firebase";

const { GOOGLE_BUCKET_IMAGES_URL } = process.env;

type PostFirebaseType = {
	title: string;
	startDate: Timestamp;
	endDate: Timestamp | null;
	createdDate: Timestamp;
	image: null | string;
	content: string;
};

export async function getPosts(): Promise<PostType[]> {
	const queryHandler = query(collection(db, addPrefix("posts")), orderBy("createdDate", "desc"));

	const posts = await getDocs(queryHandler);

	const validPosts: PostType[] = [];

	posts.forEach((doc) => {
		const postFb = doc.data() as PostFirebaseType;

		validPosts.push({
			id: doc.id,
			title: postFb.title,
			startDate: postFb.startDate.toDate().toString(),
			endDate: postFb.endDate !== null ? postFb.endDate.toDate().toString() : null,
			image: postFb.image !== null ? GOOGLE_BUCKET_IMAGES_URL + postFb.image : null,
			content: postFb.content,
			createdDate: postFb.createdDate.toDate().toString()
		});
	});

	return validPosts;
}

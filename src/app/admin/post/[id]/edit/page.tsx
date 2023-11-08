import { PostType } from "@/types/post.type";
import { Stack } from "@mui/material";

import EditPost from "./components/EditPost";

const { GOOGLE_BUCKET_IMAGES_URL } = process.env;

async function getData(postId: string): Promise<PostType | undefined> {
	const dataFetch = await fetch(
		"https://storage.googleapis.com/retirees-chelm.appspot.com/development/posts_data.json"
	);

	const posts = (await dataFetch.json()) as PostType[];

	const post = posts.find((p) => p.id === postId);

	if (post !== undefined && post.image !== undefined) {
		post.image = GOOGLE_BUCKET_IMAGES_URL + post.image;
	}

	return post;
}

export default async function Page({ params }: { params: { id: string } }): Promise<JSX.Element> {
	const postToEdit = await getData(params.id);

	return <Stack>{postToEdit !== undefined && <EditPost {...postToEdit} />}</Stack>;
}

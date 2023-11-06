import { PostType } from "@/types/post.type";

const { GOOGLE_BUCKET_IMAGES_URL } = process.env;

async function getData(postId: string): Promise<{ post: PostType | undefined }> {
	const dataFetch = await fetch(
		"https://storage.googleapis.com/retirees-chelm.appspot.com/development/posts_data.json"
	);

	const posts = (await dataFetch.json()) as PostType[];

	const post = posts.find((p) => p.id === postId);

	if (post !== undefined && post.image !== undefined) {
		post.image = GOOGLE_BUCKET_IMAGES_URL + post.image;
	}

	return { post };
}

export default async function Page({ params }: { params: { id: string } }): Promise<JSX.Element> {
	const data = await getData(params.id);

	return <>siema</>;
}

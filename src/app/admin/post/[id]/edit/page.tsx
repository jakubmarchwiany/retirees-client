import { getPost } from "@/app/api/db/queries/get_post";
import { PostType } from "@/types/post.type";
import { Stack } from "@mui/material";

import EditPost from "./components/EditPost";

async function getData(postId: string): Promise<PostType | null> {
	const post = await getPost(postId);

	return post;
}

export default async function Page({ params }: { params: { id: string } }): Promise<JSX.Element> {
	const postToEdit = await getData(params.id);

	return <Stack>{postToEdit !== null && <EditPost {...postToEdit} />}</Stack>;
}

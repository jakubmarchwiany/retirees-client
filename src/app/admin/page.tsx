import Post from "@/app/components/post/Post";
import PostsPagination from "@/app/components/post/PostsPagination";
import { PostType } from "@/types/post.type";
import { Box, Stack } from "@mui/material";
import { unstable_cache } from "next/cache";

import { getPosts } from "../api/db/queries/get_posts";
import DeleteButton from "../components/post/DeleteButton";
import EditButton from "../components/post/EditButton";

const { GOOGLE_BUCKET_IMAGES_URL } = process.env;

const getCachedPosts = unstable_cache(
	async (id) => {
		try {
			const posts = await getPosts();

			console.log(new Date());

			return { posts };
		} catch (error) {
			return { posts: [] };
		}
	},
	["get-posts-id"],
	{ tags: ["posts_update"] }
);

export default async function AdminPage({
	searchParams
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}): Promise<JSX.Element> {
	const currentPage = searchParams["currentPage"] ?? "1";

	const { posts } = await getCachedPosts(Number(currentPage));

	const generatePosts = (): JSX.Element[] => {
		return posts.map((item) => {
			return (
				<Box
					justifyContent="center"
					key={"box_post_" + item.id}
					position="relative"
					sx={{ display: "flex" }}
					width="100%"
				>
					<Post key={item.id} {...item} />

					<EditButton id={item.id} />
					<DeleteButton id={item.id} />
				</Box>
			);
		});
	};

	return (
		<Stack alignItems="center" justifyContent="center" spacing={{ lg: 2, sm: 1.5, xs: 1 }}>
			{generatePosts()}

			<PostsPagination currentPage={Number(currentPage)} numberOfPages={0} />
		</Stack>
	);
}

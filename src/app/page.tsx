import Post from "@/app/components/post/Post";
import PostsPagination from "@/app/components/post/PostsPagination";
import { Stack } from "@mui/material";
import { unstable_cache } from "next/cache";

import { getPosts } from "./api/db/queries/get_posts";

const getCachedPosts = unstable_cache(
	async (id) => {
		try {
			const posts = await getPosts();

			return { posts };
		} catch (error) {
			return { posts: [] };
		}
	},
	["get-posts-id"],
	{ tags: ["posts_update"] }
);

export default async function HomePage({
	searchParams
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}): Promise<JSX.Element> {
	const currentPage = searchParams["currentPage"] ?? "1";

	const { posts } = await getCachedPosts(currentPage);

	const generatePosts = (): JSX.Element[] => {
		return posts.map((item) => {
			return <Post key={item.id} {...item} />;
		});
	};

	return (
		<Stack alignItems="center" justifyContent="center" spacing={{ xs: 1, sm: 1.5, lg: 2 }}>
			{generatePosts()}

			<PostsPagination currentPage={Number(currentPage)} numberOfPages={0} />
		</Stack>
	);
}

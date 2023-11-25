import Post from "@/app/components/post/Post";
import PostsPagination from "@/app/components/post/PostsPagination";
import { PostType } from "@/types/post.type";
import { Box, Stack } from "@mui/material";

import DeleteButton from "../components/post/DeleteButton";
import EditButton from "../components/post/EditButton";

const { GOOGLE_BUCKET_IMAGES_URL } = process.env;

async function getData(currentPage: number): Promise<{ posts: PostType[]; numberOfPages: number }> {
	const dataFetch = await fetch(
		"https://storage.googleapis.com/retirees-chelm.appspot.com/development/posts_data.json",
		{
			next: { tags: ["posts_update"] }
		}
	);

	const posts = (await dataFetch.json()) as PostType[];

	const startIndex = currentPage === 1 ? 0 : (currentPage - 1) * 5;

	let trimPosts = posts.slice(startIndex, startIndex + 5);
	const numberOfPages = Math.ceil(posts.length / 5);

	trimPosts = trimPosts.map((p) => {
		if (p.image !== undefined) {
			return { ...p, image: GOOGLE_BUCKET_IMAGES_URL + p.image };
		} else {
			return p;
		}
	});

	return { posts: trimPosts, numberOfPages };
}

export default async function HomePage({
	searchParams
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}): Promise<JSX.Element> {
	const currentPage = searchParams["currentPage"] ?? "1";

	const { posts, numberOfPages } = await getData(Number(currentPage));

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
		<Stack alignItems="center" justifyContent="center" spacing={{ xs: 1, sm: 1.5, lg: 2 }}>
			{generatePosts()}

			<PostsPagination currentPage={Number(currentPage)} numberOfPages={numberOfPages} />
		</Stack>
	);
}

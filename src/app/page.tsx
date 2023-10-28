import Post from "@/components/post/Post";
import PostsPagination from "@/components/post/PostsPagination";
import { PostType } from "@/components/post/post.type";
import { sleep } from "@/utils/sleep";
import { Container, Stack } from "@mui/material";

async function getData(currentPage: number): Promise<{ posts: PostType[]; numberOfPages: number }> {
	const dataFetch = await fetch("http://localhost:8080/posts", {
		next: { tags: ["posts"] }
	});

	const posts = (await dataFetch.json()) as PostType[];

	const startIndex = currentPage === 1 ? 0 : (currentPage - 1) * 5;

	const trimPosts = posts.slice(startIndex, startIndex + 5);
	const numberOfPages = Math.ceil(posts.length / 5);

	await sleep(500);

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
			return <Post key={item.id} {...item} />;
		});
	};

	return (
		<Container component="main">
			<Stack alignItems="center" justifyContent="center" spacing={{ xs: 1, sm: 1.5, lg: 2 }}>
				{generatePosts()}

				<PostsPagination currentPage={Number(currentPage)} numberOfPages={numberOfPages} />
			</Stack>
		</Container>
	);
}

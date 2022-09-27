import { Pagination, Skeleton, Stack, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Post from "../src/components/Post";
import { PostType } from "../src/components/post.interface";
import { getFetch } from "../src/utils/fetches";

const ENV = process.env.NEXT_PUBLIC_ENV;
const DEV_API_ENDPOINT = process.env.NEXT_PUBLIC_DEV_API_ENDPOINT;

console.log(ENV)

const Home: NextPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const [numberOfPages, setNumberOfPages] = useState<number | undefined>(
    undefined
  );

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    document.getElementById("scroller")!.scroll(0, 0);
    setPage(value);
    setLoading(true);
  };

  useEffect(() => {
    const END_POINT =
      ENV === "development"
        ? DEV_API_ENDPOINT
        : window.location.origin + "/api";

    getFetch<{ posts: PostType[]; numberOfPages: number }>(
      END_POINT + `/posts?page=${page - 1}`
    )
      .then(({ posts, numberOfPages }) => {
        setPosts(posts);
        setLoading(false);
        setNumberOfPages(numberOfPages);
      })
      .catch(() => {
        setPosts([]);
        setLoading(false);
      });
  }, [isLoading]);

  const generatePosts = () => {
    return posts?.map((item) => {
      return <Post key={item.id} post={item} />;
    });
  };

  return (
    <>
      <Head>
        <title>Strona główna</title>
        <meta
          name="description"
          content="Strona główna. Tutaj znajdziesz najnowsze posty"
        />
        <link rel="canonical" href="/" />
      </Head>
      <Stack
        sx={{ mx: { xs: 1, sm: 10, md: 20, lg: 30, xl: 40 }, my: 3 }}
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Pagination
          size="large"
          count={numberOfPages}
          page={page}
          onChange={handleChange}
        />
        {isLoading ? (
          <>
            <Stack width={"100%"} spacing={0.5}>
              <Skeleton variant="rounded" width={"60%"} height={45} />
              <Skeleton variant="rounded" width={"40%"} height={35} />
              <Skeleton variant="rounded" width={"100%"} height={710} />
              <Skeleton variant="rounded" width={"100%"} height={55} />
            </Stack>
          </>
        ) : (
          generatePosts()
        )}
        {posts?.length === 0 && (
          <Typography variant="h2">Brak postów</Typography>
        )}
        <Pagination
          size="large"
          count={numberOfPages}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </>
  );
};

export default Home;

import { Pagination, Skeleton, Stack, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Post, { PostType } from "../src/components/Post";

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
  };

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setNumberOfPages(Math.ceil(data.length / 5));
        setLoading(false);
      })
      .catch(() => {
        console.log("Error");
        setPosts([]);
        setLoading(false);
      });
  }, []);

  const generatePosts = () => {
    const index = (page - 1) * 5;
    return posts?.slice(index, index + 5).map((item) => {
      return <Post key={item.id} {...item} />;
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
        sx={{
          mx: { xs: 1, sm: 10, md: 20, lg: 30, xl: 40 },
          my: { xs: 1, sm: 1.5, lg: 2 },
        }}
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 1, sm: 1.5, lg: 2 }}
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
        ) : posts?.length !== 0 ? (
          generatePosts()
        ) : (
          <Typography variant="h2">Coś poszło nie tak</Typography>
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

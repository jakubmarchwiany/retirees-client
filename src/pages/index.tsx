import { Container, Fab, Pagination, Skeleton, Stack, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Post, { PostType } from "../components/Post";

const Home: NextPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = useState<number>(1);
    const [posts, setPosts] = useState<PostType[] | undefined>(undefined);
    const [tmpPosts, setTmpPosts] = useState<PostType[] | undefined>(undefined);
    const [numberOfPages, setNumberOfPages] = useState<number | undefined>(undefined);
    const [isSortByDate, setIsSortByDate] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setPage(value);
    };

    useEffect(() => {
        const toastId = toast.loading("Ładowanie...");
        fetch("/api/posts")
            .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    toast.success(data.message, { id: toastId });
                    setPosts(data.posts);
                    setNumberOfPages(Math.ceil(data.posts.length / 5));
                } else {
                    toast.error(data.message, { id: toastId });
                    setPosts(undefined);
                }
                setLoading(false);
            })
            .catch(() => {
                toast.error("Coś poszło nie tak :(", { id: toastId });
                setPosts(undefined);
                setLoading(false);
            });
    }, []);

    const generatePosts = () => {
        const index = (page - 1) * 5;
        return posts?.slice(index, index + 5).map((item) => {
            return <Post key={item.id} {...item} />;
        });
    };

    const sortPosts = () => {
        if (isSortByDate) {
            setPosts(tmpPosts);
        } else {
            setTmpPosts(posts);
            setPosts(
                [...posts!].sort(
                    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
                )
            );
        }
        setIsSortByDate(!isSortByDate);
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
            <Container component="main">
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    spacing={{ xs: 1, sm: 1.5, lg: 2 }}
                >
                    {isLoading ? (
                        <>
                            <Stack width={"100%"} spacing={0.5}>
                                <Skeleton variant="rounded" width={"60%"} height={45} />
                                <Skeleton variant="rounded" width={"40%"} height={35} />
                                <Skeleton variant="rounded" width={"100%"} height={710} />
                                <Skeleton variant="rounded" width={"100%"} height={55} />
                            </Stack>
                        </>
                    ) : posts ? (
                        generatePosts()
                    ) : (
                        <Typography variant="h2">Brak postów</Typography>
                    )}
                    <Pagination
                        size="large"
                        count={numberOfPages}
                        page={page}
                        onChange={handleChange}
                    />
                </Stack>
                {posts && (
                    <Fab
                        size="large"
                        color="primary"
                        aria-label="add"
                        variant="extended"
                        onClick={sortPosts}
                        sx={{
                            position: "absolute",
                            top: "12%",
                            right: "3%",
                            transform: "translateY(-50%)",
                        }}
                    >
                        {isSortByDate ? "Sortuj po dacie dodania" : "Sortuj po dacie"}
                    </Fab>
                )}
            </Container>
        </>
    );
};
export default Home;

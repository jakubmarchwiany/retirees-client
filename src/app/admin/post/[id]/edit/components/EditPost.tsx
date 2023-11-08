"use client";

import Post from "@/app/components/post/Post";
import { myFetch } from "@/app/components/utils/fetches";
import { sleep } from "@/app/components/utils/sleep";
import { PostType } from "@/types/post.type";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import DateForm from "../../../create/components/DateForm";
import TextEditor from "../../../create/components/TextEditor";
import { postValidation } from "../../../create/components/post.validation";

export default function EditPost({
	id: initId,
	title: initTitle,
	startDate: initStartDate,
	endDate: initEndDate,
	image: initImage,
	content: initContent
}: PostType): JSX.Element {
	const [title, setTitle] = useState<string>(initTitle);
	const [startDate, setStartDate] = useState<Dayjs | undefined>(dayjs(initStartDate));
	const [endDate, setEndDate] = useState<Dayjs | undefined>(() => {
		if (initEndDate !== undefined) {
			return dayjs(initEndDate);
		}
	});
	const [cropImage, setCropImage] = useState<string | undefined>(initImage);
	const [content, setContent] = useState<string>(initContent);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const router = useRouter();

	const editPost = (): void => {
		if (postValidation(title, startDate, content)) {
			setIsLoading(true);

			myFetch(`/admin/posts/${initId}`, "PATCH", {
				body: JSON.stringify({ title, startDate, endDate, content }),
				customError: true
			})
				.then(async () => {
					await sleep(500);

					router.push("/admin");
				})
				.catch(() => {
					setIsLoading(false);
				});
		}
	};

	return (
		<Stack alignItems="center">
			<Stack
				alignItems="center"
				justifyContent="center"
				mb={5}
				sx={{ width: { xs: "95%", sm: "80%", md: "70%", lg: "60%", xl: "50%" } }}
			>
				<Typography component="h1" variant="h2">
					Edytuj post
				</Typography>

				<TextField
					autoFocus={true}
					color="secondary"
					label={"Tytuł Posta"}
					onChange={(e): void => {
						setTitle(e.target.value);
					}}
					sx={{ mt: 2, width: "50%" }}
					value={title}
				/>

				<DateForm
					endDate={endDate}
					setEndDate={setEndDate}
					setStartDate={setStartDate}
					startDate={startDate}
				/>

				<TextEditor content={content} setContent={setContent} />
			</Stack>

			<Post
				content={content}
				endDate={endDate && endDate.toString()}
				id={initId}
				image={cropImage}
				startDate={startDate !== undefined ? startDate.toString() : "Brak daty"}
				title={title}
			/>

			<LoadingButton
				color="success"
				loading={isLoading}
				onClick={editPost}
				sx={{ mt: 2, width: { xs: "95%", sm: "80%", md: "70%", lg: "60%", xl: "50%" } }}
				variant="contained"
			>
				Edytuj Post
			</LoadingButton>
		</Stack>
	);
}

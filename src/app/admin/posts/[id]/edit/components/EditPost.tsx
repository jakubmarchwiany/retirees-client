"use client";

import Post from "@/app/components/post/Post";
import { myFetch } from "@/app/components/utils/myFetch";
import { PostType } from "@/types/post.type";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import DateForm from "../../../create/components/DateForm";
import TextEditor from "../../../create/components/TextEditor";
import { postValidation } from "../../../create/components/post.validation";

export default function EditPost({
	id: initId,
	title: initTitle,
	startDate: initStartDate,
	endDate: initEndDate,
	image: initImage,
	content: initContent,
	createdDate: initCreatedDate
}: PostType): JSX.Element {
	const [title, setTitle] = useState<string>(initTitle);
	const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(initStartDate));
	const [endDate, setEndDate] = useState<Dayjs | null>(() => {
		if (initEndDate !== null) {
			return dayjs(initEndDate);
		} else {
			return null;
		}
	});
	const [cropImage, setCropImage] = useState<null | string>(initImage);
	const [content, setContent] = useState<string>(initContent);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	const editPost = (): void => {
		if (postValidation(title, startDate, content)) {
			setIsLoading(true);

			myFetch(`/admin/posts/${initId}`, {
				body: JSON.stringify({ content, endDate, startDate, title }),
				customError: true,
				method: "PATCH"
			})
				.then(() => {
					router.push("/admin");

					startTransition(() => router.push("/admin"));

					startTransition(() => router.refresh());
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
				sx={{ width: { lg: "60%", md: "70%", sm: "80%", xl: "50%", xs: "95%" } }}
			>
				<Typography component="h1" variant="h2">
					Edytuj post
				</Typography>

				<TextField
					autoFocus={true}
					color="secondary"
					label="Tytuł Posta"
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
				createdDate={initCreatedDate}
				endDate={endDate && endDate.toString()}
				id={initId}
				image={cropImage}
				startDate={startDate !== null ? startDate.toString() : "Brak daty"}
				title={title}
			/>

			<LoadingButton
				color="success"
				loading={isLoading}
				onClick={editPost}
				sx={{ mt: 2, width: { lg: "60%", md: "70%", sm: "80%", xl: "50%", xs: "95%" } }}
				variant="contained"
			>
				Edytuj Post
			</LoadingButton>
		</Stack>
	);
}

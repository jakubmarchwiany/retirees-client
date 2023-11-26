/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import DateForm from "@/app/admin/posts/create/components/DateForm";
import TextEditor from "@/app/admin/posts/create/components/TextEditor";
import { postValidation } from "@/app/admin/posts/create/components/post.validation";
import Post from "@/app/components/post/Post";
import { dataURLtoFile } from "@/app/components/utils/dataURLToFile";
import { myFetch } from "@/app/components/utils/myFetch";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { ImageSelector } from "./components/image/ImageSelector";

export default function CreatePostPage(): JSX.Element {
	const [title, setTitle] = useState<string>("");
	const [startDate, setStartDate] = useState<Dayjs | null>(null);
	const [endDate, setEndDate] = useState<Dayjs | null>(null);
	const [cropImage, setCropImage] = useState<null | string>(null);
	const [content, setContent] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	const addPost = (): void => {
		if (postValidation(title, startDate, content)) {
			const formData = new FormData();

			formData.append("title", title);

			formData.append("startDate", startDate!.toString());

			if (cropImage !== null) {
				const file = dataURLtoFile(cropImage, `post_image.png`);

				formData.append("file", file);
			}

			if (endDate !== null) {
				formData.append("endDate", endDate.toString());
			}

			formData.append("content", content);

			setIsLoading(true);

			myFetch("/admin/posts/-/create", {
				method: "POST",
				body: formData,
				headers: undefined,
				customError: true
			})
				.then(() => {
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
				sx={{ width: { xs: "95%", sm: "80%", md: "70%", lg: "60%", xl: "50%" } }}
			>
				<Typography component="h1" variant="h2">
					Kreator posta
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

				<ImageSelector setCropImage={setCropImage} />

				<TextEditor content={content} setContent={setContent} />
			</Stack>

			<Post
				content={content}
				createdDate={new Date().toString()}
				endDate={endDate !== null ? endDate.toString() : null}
				id="1"
				image={cropImage}
				startDate={startDate !== null ? startDate.toString() : "Brak daty"}
				title={title}
			/>

			<LoadingButton
				color="success"
				loading={isLoading}
				onClick={addPost}
				sx={{ mt: 2, width: { xs: "95%", sm: "80%", md: "70%", lg: "60%", xl: "50%" } }}
				variant="contained"
			>
				Dodaj Post
			</LoadingButton>
		</Stack>
	);
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import DateForm from "@/components/create_post/DateForm";
import { ImageSelector } from "@/components/create_post/ImageSelector";
import TextEditor from "@/components/create_post/TextEditor";
import Post from "@/components/post/Post";
import { postValidation } from "@/components/post/post.validation";
import { formDataFetch } from "@/utils/fetches";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import { useState } from "react";

export default function NewPostPage(): JSX.Element {
	const [title, setTitle] = useState("");

	const [startDate, setStartDate] = useState<Dayjs | undefined>(undefined);
	const [endDate, setEndDate] = useState<Dayjs | undefined>(undefined);
	const [cropImage, setCropImage] = useState<string | undefined>(undefined);
	const [content, setContent] = useState("");

	const addPost = (): void => {
		if (postValidation(title, startDate, content)) {
			const body = new FormData() as FormData;

			body.set("title", title);

			body.set("startDate", startDate!.toString());

			if (endDate !== undefined) {
				body.set("endDate", endDate.toString());
			}
			if (cropImage !== undefined) {
				body.set("image", cropImage);
			}

			body.set("content", content);

			formDataFetch(body, "/admin/posts/-/create").then(() => {});
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

				<ImageSelector setCropImage={setCropImage} />

				<TextEditor content={content} setContent={setContent} />
			</Stack>

			<Post
				content={content}
				endDate={endDate && endDate.toString()}
				id={"1"}
				imageURL={cropImage}
				startDate={startDate !== undefined ? startDate.toString() : "Brak daty"}
				title={title}
			/>

			<Button
				color="success"
				onClick={addPost}
				sx={{ mt: 2, width: { xs: "95%", sm: "80%", md: "70%", lg: "60%", xl: "50%" } }}
				variant="contained"
			>
				Dodaj Post
			</Button>
		</Stack>
	);
}

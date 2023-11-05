/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import DateForm from "@/app/admin/post/create/components/DateForm";
import TextEditor from "@/app/admin/post/create/components/TextEditor";
import { postValidation } from "@/app/admin/post/create/components/post.validation";
import Post from "@/app/components/post/Post";
import { dataURLtoFile } from "@/app/components/utils/dataURLToFile";
import { formDataFetch } from "@/app/components/utils/fetches";
import { sleep } from "@/app/components/utils/sleep";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ImageSelector } from "./components/image/ImageSelector";

export default function NewPostPage(): JSX.Element {
	const [title, setTitle] = useState<string>("");
	const [startDate, setStartDate] = useState<Dayjs | undefined>(undefined);
	const [endDate, setEndDate] = useState<Dayjs | undefined>(undefined);
	const [cropImage, setCropImage] = useState<string | undefined>(undefined);
	const [content, setContent] = useState<string>("");

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const router = useRouter();

	const addPost = (): void => {
		if (postValidation(title, startDate, content)) {
			const formData = new FormData();

			formData.append("title", title);

			formData.append("startDate", startDate!.toString());

			if (cropImage !== undefined) {
				const file = dataURLtoFile(cropImage, `post_image.png`);

				formData.append("file", file);
			}

			if (endDate !== undefined) {
				formData.append("endDate", endDate.toString());
			}

			formData.append("content", content);

			setIsLoading(true);

			formDataFetch(formData, "/admin/posts/-/create", { customError: true })
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
				image={cropImage}
				startDate={startDate !== undefined ? startDate.toString() : "Brak daty"}
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

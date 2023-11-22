import { Button, Stack } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
	selectedImage: ArrayBuffer | string | undefined;
	setImage: (_arg0: ArrayBuffer | string | undefined) => void;
};

export default function ImageLoader({ selectedImage, setImage }: Props): JSX.Element {
	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const file = event.target.files?.[0];

		if (file) {
			const reader = new FileReader();

			reader.onload = (e): void => {
				if (e.target?.result !== null) {
					setImage(e.target?.result);
				}
			};

			reader.readAsDataURL(file);
		}
	};

	return (
		<Stack direction="row" mt={2}>
			<Button component="label" variant="contained">
				{selectedImage !== undefined ? "Zmień zdjęcie" : "Dodaj zdjęcie (opcjonalne)"}
				<input accept="image/*" hidden onChange={handleImageUpload} type="file" />
			</Button>
			{selectedImage !== undefined && (
				<Button
					color="error"
					onClick={(): void => {
						setImage(undefined);
					}}
					variant="contained"
				>
					Usuń zdjęcie
				</Button>
			)}
		</Stack>
	);
}

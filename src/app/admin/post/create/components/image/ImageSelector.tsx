import { Typography } from "@mui/material";
import "cropperjs/dist/cropper.css";
import { Dispatch, SetStateAction, useState } from "react";

import ImageEditor from "./ImageEditor";
import ImageLoader from "./ImageLoader";

type Props = {
	setCropImage: Dispatch<SetStateAction<string | undefined>>;
};

export function ImageSelector({ setCropImage }: Props): JSX.Element {
	const [selectedImage, setSelectedImage] = useState<ArrayBuffer | string | undefined>(undefined);

	const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);

	const setSelectedImageAndOpenImageEditor = (
		selectedImage: ArrayBuffer | string | undefined
	): void => {
		setSelectedImage(selectedImage);

		setCropImage(undefined);

		if (selectedImage !== undefined) {
			setIsImageEditorOpen(true);
		}
	};

	const saveCropImageAndCloseImageEditor = (cropImage: string | undefined): void => {
		setCropImage(cropImage);

		setIsImageEditorOpen(false);
	};

	const convertArrayBufferToString = (): string | undefined => {
		const textDecoder = new TextDecoder("utf-8");

		if (selectedImage !== undefined) {
			if (selectedImage instanceof ArrayBuffer) {
				return textDecoder.decode(selectedImage);
			} else {
				return selectedImage;
			}
		}
	};

	return (
		<>
			<Typography mt={1} textAlign="center" variant="h4">
				Zdjęcie
			</Typography>

			<ImageLoader
				selectedImage={selectedImage}
				setImage={setSelectedImageAndOpenImageEditor}
			/>

			{isImageEditorOpen && (
				<ImageEditor
					saveCropImage={saveCropImageAndCloseImageEditor}
					selectedImage={convertArrayBufferToString()}
				/>
			)}
		</>
	);
}

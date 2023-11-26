import { Typography } from "@mui/material";
import "cropperjs/dist/cropper.css";
import { Dispatch, SetStateAction, useState } from "react";

import ImageEditor from "./ImageEditor";
import ImageLoader from "./ImageLoader";

type Props = {
	setCropImage: Dispatch<SetStateAction<null | string>>;
};

export function ImageSelector({ setCropImage }: Props): JSX.Element {
	const [selectedImage, setSelectedImage] = useState<ArrayBuffer | null | string>(null);

	const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);

	const setSelectedImageAndOpenImageEditor = (
		selectedImage: ArrayBuffer | null | string
	): void => {
		setSelectedImage(selectedImage);

		setCropImage(null);

		if (selectedImage !== null) {
			setIsImageEditorOpen(true);
		}
	};

	const saveCropImageAndCloseImageEditor = (cropImage: null | string): void => {
		setCropImage(cropImage);

		setIsImageEditorOpen(false);
	};

	const convertArrayBufferToString = (selectedImage: ArrayBuffer | string): string => {
		const textDecoder = new TextDecoder("utf-8");

		if (selectedImage instanceof ArrayBuffer) {
			return textDecoder.decode(selectedImage);
		} else {
			return selectedImage;
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

			{isImageEditorOpen && selectedImage !== null && (
				<ImageEditor
					saveCropImage={saveCropImageAndCloseImageEditor}
					selectedImage={convertArrayBufferToString(selectedImage)}
				/>
			)}
		</>
	);
}

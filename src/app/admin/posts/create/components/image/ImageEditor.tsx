/* eslint-disable @next/next/no-img-element */
import { Button, Modal, Stack } from "@mui/material";
import "cropperjs/dist/cropper.css";
import { useRef, useState } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";

import "./image_editor.css";

type Props = {
	selectedImage: string;
	saveCropImage: (cropImage: null | string) => void;
};

export default function ImageEditor({ selectedImage, saveCropImage }: Props): JSX.Element {
	const cropperRef = useRef<ReactCropperElement>(null);
	const [cropImage, setCropImage] = useState<null | string>(null);

	const getCropData = (): void => {
		if (cropperRef.current?.cropper) {
			setCropImage(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
		}
	};

	return (
		<Modal
			open={true}
			sx={{
				marginBottom: "5%",
				overflow: "scroll"
			}}
		>
			<Stack
				bgcolor="background.paper"
				color="text.primary"
				sx={{
					boxShadow: 10,
					left: "50%",
					position: "absolute" as const,
					top: "5%",
					transform: "translate(-50%, 0%)"
				}}
			>
				<Button
					color="warning"
					onClick={(): void => {
						saveCropImage(null);
					}}
					sx={{ borderRadius: 0 }}
					variant="contained"
				>
					Anuluj
				</Button>

				<Cropper
					aspectRatio={16 / 9}
					background={true}
					center={true}
					guides={false}
					minCropBoxHeight={100}
					minCropBoxWidth={100}
					ref={cropperRef}
					src={selectedImage}
					style={{ height: 400, width: "100%" }}
				/>

				<Button onClick={getCropData} sx={{ borderRadius: 0 }} variant="contained">
					Wytnij ze zdjęcia
				</Button>

				{cropImage !== null && (
					<>
						<img alt="cropped" src={cropImage} style={{ width: "100%" }} />
						<Button
							color="success"
							onClick={(): void => {
								saveCropImage(cropImage);
							}}
							sx={{ borderRadius: 0 }}
							variant="contained"
						>
							Dodaj wycięte zdjęcie
						</Button>
					</>
				)}
			</Stack>
		</Modal>
	);
}

import { Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
	content: string;
	setContent: Dispatch<SetStateAction<string>>;
};

export default function TextEditor({ content, setContent }: Props): JSX.Element {
	const modules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5] }],
			[{ color: [] }, { background: [] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
			[{ align: [] }],
			["link"],
			["clean"]
		]
	};

	return (
		<>
			<Typography sx={{ mt: 2, mb: 1 }} textAlign="center" variant="h4">
				Treść posta
			</Typography>

			<ReactQuill
				modules={modules}
				onChange={setContent}
				style={{
					width: "100%",
					color: "black",
					background: "white"
				}}
				theme="snow"
				value={content}
			/>
		</>
	);
}

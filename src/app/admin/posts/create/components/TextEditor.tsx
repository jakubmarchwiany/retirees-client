import { Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useMemo } from "react";
import "react-quill/dist/quill.snow.css";

type Props = {
	content: string;
	setContent: Dispatch<SetStateAction<string>>;
};

export default function TextEditor({ content, setContent }: Props): JSX.Element {
	const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

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
			<Typography sx={{ mb: 1, mt: 2 }} textAlign="center" variant="h4">
				Treść posta
			</Typography>

			<ReactQuill
				modules={modules}
				onChange={setContent}
				style={{
					background: "white",
					color: "black",
					width: "100%"
				}}
				theme="snow"
				value={content}
			/>
		</>
	);
}

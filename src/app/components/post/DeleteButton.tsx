"use client";

import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { myFetch } from "../utils/myFetch";

type Props = {
	id: string;
};

export default function DeleteButton({ id }: Props): JSX.Element {
	const navigate = useRouter();

	const handleDelete = (): void => {
		toast.remove();

		myFetch(`/admin/posts/${id}`, {
			method: "DELETE"
		}).then(() => {
			navigate.refresh();
		});
	};

	return (
		<IconButton
			onClick={(): void => {
				toast.error("Kliknij dwukrotnie by usunąć post");
			}}
			onDoubleClick={handleDelete}
			size="small"
			sx={{
				position: "absolute",
				right: {
					lg: "21%",
					md: "16%",
					sm: "11%",
					xl: "25.5%",
					xs: "4%"
				},
				top: "50px"
			}}
		>
			<Delete color="error" fontSize="large" />
		</IconButton>
	);
}

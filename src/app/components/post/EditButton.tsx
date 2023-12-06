import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Link from "next/link";

type Props = {
	id: string;
};

export default function EditButton({ id }: Props): JSX.Element {
	return (
		<Link href={`/admin/posts/${id}/edit`} passHref style={{ textDecoration: "none" }}>
			<IconButton
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
					top: "5px"
				}}
			>
				<Edit color="primary" fontSize="large" />
			</IconButton>
		</Link>
	);
}

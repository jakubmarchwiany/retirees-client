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
					top: "5px",
					right: {
						xs: "4%",
						sm: "11%",
						md: "16%",
						lg: "21%",
						xl: "25.5%"
					}
				}}
			>
				<Edit color="primary" fontSize="large" />
			</IconButton>
		</Link>
	);
}

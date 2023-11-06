import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Link from "next/link";

type Props = {
	href: string;
};

export default function EditButton({ href }: Props): JSX.Element {
	return (
		<IconButton
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
			<Link href={href} passHref style={{ textDecoration: "none" }}>
				<Edit color="primary" fontSize="medium" />
			</Link>
		</IconButton>
	);
}

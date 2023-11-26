import { Button, ButtonProps } from "@mui/material";
import Link from "next/link";

type Props = {
	text: string;
	href: string;
	isActive: boolean;
	props?: ButtonProps;
};

function MyLinkButton({ href, isActive, text, props }: Props): JSX.Element {
	return (
		<Link href={href} passHref style={{ textDecoration: "none" }}>
			<Button
				disabled={isActive}
				fullWidth
				size="large"
				sx={{ color: "primary.main" }}
				{...props}
			>
				{text}
			</Button>
		</Link>
	);
}
export default MyLinkButton;

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
        <Link href={href} style={{ textDecoration: "none" }} passHref>
            <Button
                size="large"
                disabled={isActive}
                fullWidth
                sx={{ color: "primary.main" }}
                {...props}
            >
                {text}
            </Button>
        </Link>
    );
}
export default MyLinkButton;

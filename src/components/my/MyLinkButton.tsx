import { Button, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Link from "next/link";

type Props = {
    text: string;
    href: string;
    isActive?: boolean;
    size?: "small" | "medium" | "large";
    textColor?: string;
    Icon?: OverridableComponent<SvgIconTypeMap<unknown, "svg">> & {
        muiName: string;
    };
    fullWidth?: boolean;
    closeMenu?: () => void;
};

function MyLinkButton({
    text,
    href,
    isActive = false,
    size = "large",
    textColor = "secondary.contrastText",
    Icon,
    fullWidth = false,
    closeMenu,
}: Props) {
    return (
        <Link href={href} style={{ textDecoration: "none" }}>
            <Button
                size={size}
                startIcon={Icon && <Icon />}
                disabled={isActive}
                sx={{ color: textColor }}
                fullWidth={fullWidth}
                onClick={closeMenu}
            >
                {text}
            </Button>
        </Link>
    );
}
export default MyLinkButton;

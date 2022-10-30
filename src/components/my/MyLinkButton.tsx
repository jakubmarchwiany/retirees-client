import { Button, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Link from "next/link";

type Props = {
    text: string;
    href: string;
    isActive?: boolean;
    size?: "small" | "medium" | "large";
    textColor?: string;
    Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
    closeMenu?: () => void;
};

function MyLinkButton({
    text,
    href,
    isActive = false,
    size = "medium",
    textColor = "secondary.contrastText",
    Icon,
    closeMenu,
}: Props) {
    return (
        <Link href={href} passHref>
            <Button
                size={size}
                startIcon={Icon && <Icon />}
                disabled={isActive}
                sx={{ color: textColor }}
                onClick={closeMenu}
            >
                {text}
            </Button>
        </Link>
    );
}

export default MyLinkButton;

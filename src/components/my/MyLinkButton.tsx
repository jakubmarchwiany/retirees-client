import { Button, Link as MUILink, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import NextLink, { LinkProps } from "next/link";

type Props = {
  isActive: boolean;
  text: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  closeMenu?: () => void;
} & LinkProps;

let noActiveStyle = {
  textDecoration: "none",
};

function MyLinkButton({ isActive, href, text, Icon, closeMenu }: Props) {
  return isActive ? (
    <></>
  ) : (
    <NextLink href={href} passHref>
      <MUILink
        component={Button}
        size="large"
        startIcon={<Icon fontSize="large" />}
        onClick={closeMenu}
        style={noActiveStyle}
        sx={{ fontWeight: "inherit", color: "primary" }}
      >
        {text}
      </MUILink>
    </NextLink>
  );
}

export default MyLinkButton;

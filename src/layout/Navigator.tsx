import { ContactMail, Home, Login } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import MyLinkButton from "../components/my/MyLinkButton";

interface NavigatorProps {
    menu: boolean;
    closeMenu?: () => void;
}

const Navigator = ({ menu, closeMenu }: NavigatorProps) => {
    const router = useRouter();

    return (
        <Stack direction={menu ? "column" : "row"}>
            <MyLinkButton
                isActive={router.pathname === "/"}
                href="/"
                closeMenu={closeMenu}
                text="Strona główna"
                Icon={Home}
            />
            <MyLinkButton
                isActive={router.pathname === "/contact"}
                href="/contact"
                closeMenu={closeMenu}
                text="Kontakt"
                Icon={ContactMail}
            />

            <MyLinkButton
                isActive={router.pathname === "/login"}
                href="/login"
                closeMenu={closeMenu}
                text="Logowanie"
                Icon={Login}
            />
        </Stack>
    );
};
export default Navigator;

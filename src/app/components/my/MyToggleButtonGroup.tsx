import { ToggleButtonGroup, ToggleButtonProps } from "@mui/material";
import { lighten, styled } from "@mui/material/styles";

export const MyToggleButtonGroup = styled(ToggleButtonGroup)<ToggleButtonProps>(({ theme }) => ({
	...(theme.palette.mode === "light"
		? {
				"& .MuiToggleButton-root.Mui-selected": {
					backgroundColor: lighten(theme.palette.primary.main, 0.3),
					color: "white"
				},
				"& .MuiToggleButton-root.Mui-selected:hover": {
					backgroundColor: theme.palette.primary.main
				}
		  }
		: {
				"& .MuiToggleButton-root.Mui-selected": {
					backgroundColor: theme.palette.primary.main,
					color: "white"
				},
				"& .MuiToggleButton-root.Mui-selected:hover": {
					backgroundColor: lighten(theme.palette.primary.main, 0.1)
				}
		  })
}));

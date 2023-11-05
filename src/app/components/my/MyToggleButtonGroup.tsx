import { ToggleButtonGroup, ToggleButtonProps } from "@mui/material";
import { lighten, styled } from "@mui/material/styles";

export const MyToggleButtonGroup = styled(ToggleButtonGroup)<ToggleButtonProps>(({ theme }) => ({
	...(theme.palette.mode === "light"
		? {
				"& .MuiToggleButton-root.Mui-selected": {
					color: "white",
					backgroundColor: lighten(theme.palette.primary.main, 0.3)
				},
				"& .MuiToggleButton-root.Mui-selected:hover": {
					backgroundColor: theme.palette.primary.main
				}
		  }
		: {
				"& .MuiToggleButton-root.Mui-selected": {
					color: "white",
					backgroundColor: theme.palette.primary.main
				},
				"& .MuiToggleButton-root.Mui-selected:hover": {
					backgroundColor: lighten(theme.palette.primary.main, 0.1)
				}
		  })
}));

import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
	"& input": {
		color: theme.palette.primary.contrastText
	},
	"& label": {
		color: theme.palette.primary.contrastText
	},
	"& label.Mui-focused": {
		color: theme.palette.primary.contrastText
	},
	"& .MuiOutlinedInput-root": {
		backgroundColor: "#f5f5f5",
		"&:hover fieldset": {
			borderColor: theme.palette.primary.main
		},
		"&.Mui-focused fieldset": {
			borderColor: theme.palette.secondary.main
		}
	}
}));

export default function MyTextField(props: TextFieldProps): JSX.Element {
	return <StyledTextField variant="filled" fullWidth {...props} />;
}

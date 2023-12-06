import { TextField, TextFieldProps, styled } from "@mui/material";

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
	"& .MuiOutlinedInput-root": {
		"&.Mui-focused fieldset": {
			borderColor: theme.palette.secondary.main
		},
		"&:hover fieldset": {
			borderColor: theme.palette.primary.main
		},
		backgroundColor: "#f5f5f5"
	},
	"& input": {
		color: theme.palette.primary.contrastText
	},
	"& label": {
		color: theme.palette.primary.contrastText
	},
	"& label.Mui-focused": {
		color: theme.palette.primary.contrastText
	}
}));

export default function MyTextField(props: TextFieldProps): JSX.Element {
	return <StyledTextField fullWidth variant="filled" {...props} />;
}

import { PostType } from "@/types/post.type";
import { CardHeader, Divider, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import relativeTime from "dayjs/plugin/relativeTime"; // import plugin

import PostContent from "./PostContent";

dayjs.extend(relativeTime);

dayjs.locale("pl");

const subheader = (startDate: string, endDate: null | string): string => {
	if (endDate !== null) {
		return `Data od [ ${dayjs(startDate).format("DD.MM.YYYY")} ] do [ ${dayjs(endDate).format(
			"DD.MM.YYYY"
		)} ] `;
	} else {
		return `Data [ ${dayjs(startDate).format("DD.MM.YYYY")} ]`;
	}
};

export default function Post({ title, startDate, endDate, image, content }: PostType): JSX.Element {
	return (
		<Card
			sx={{
				backgroundColor: "background.default",
				borderRadius: 5,
				boxShadow: 15,
				width: { lg: "60%", md: "70%", sm: "80%", xl: "50%", xs: "95%" }
			}}
		>
			<CardHeader
				subheader={
					<Typography
						alignContent="center"
						sx={{ typography: { sm: "h6", xs: "caption" } }}
					>
						{subheader(startDate, endDate)}
					</Typography>
				}
				title={
					<Typography sx={{ typography: { sm: "h4", xs: "h6" } }}>
						{title ? title : "Brak tytułu"}
					</Typography>
				}
			/>
			<Divider />

			{image !== null && (
				<>
					<CardMedia
						component="img"
						image={image}
						sx={{
							minWidth: "100%",
							objectFit: "contain"
							// width: "680px",
							// height: "380px"
						}}
					/>
					<Divider />
				</>
			)}
			<PostContent content={content} />
		</Card>
	);
}

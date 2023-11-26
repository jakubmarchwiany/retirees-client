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
				width: { xs: "95%", sm: "80%", md: "70%", lg: "60%", xl: "50%" },
				borderRadius: 5,
				backgroundColor: "background.default",
				boxShadow: 15
			}}
		>
			<CardHeader
				subheader={
					<Typography
						alignContent="center"
						sx={{ typography: { xs: "caption", sm: "h6" } }}
					>
						{subheader(startDate, endDate)}
					</Typography>
				}
				title={
					<Typography sx={{ typography: { xs: "h6", sm: "h4" } }}>
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
							objectFit: "contain",
							minWidth: "100%"
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

"use client";

import { ExpandMore } from "@mui/icons-material";
import { Button, CardHeader, Collapse, Divider, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import relativeTime from "dayjs/plugin/relativeTime"; // import plugin
import parse from "html-react-parser";
import { useState } from "react";

import { ExpandMoreIcon } from "./ExpandMore";

dayjs.extend(relativeTime);

dayjs.locale("pl");

type Props = {
	id: string;
	title: string;
	startDate: string;
	endDate: string | undefined;
	imageURL: string | undefined;
	content: string;
};

export default function Post({
	id,
	title,
	startDate,
	endDate,
	imageURL,
	content
}: Props): JSX.Element {
	const [isExpand, setIsExpand] = useState(false);

	const handleExpandClick = (): void => {
		setIsExpand(!isExpand);
	};

	const isSameDay = (): boolean => {
		if (dayjs(startDate).isSame(endDate, "day")) {
			return true;
		} else {
			return false;
		}
	};

	const subheader = (): string => {
		if (endDate !== undefined) {
			return `Data od [ ${dayjs(startDate).format("DD.MM.YYYY")} ] do [ ${dayjs(
				endDate
			).format("DD.MM.YYYY")} ] `;
		} else {
			return `Data [ ${dayjs(startDate).format("DD.MM.YYYY")} ]`;
		}
	};

	return (
		<Card
			sx={{
				width: { xs: "95%", sm: "90%", md: "80%", lg: "70%", xl: "60%" },
				borderRadius: 5,
				backgroundColor: "background.default",
				boxShadow: 15
			}}
		>
			<CardHeader
				subheader={
					<Typography
						alignContent={"center"}
						sx={{ typography: { xs: "caption", sm: "h6" } }}
					>
						{subheader()}
					</Typography>
				}
				title={
					<Typography sx={{ typography: { xs: "h6", sm: "h4" } }}>
						{title ? title : "Brak tytułu"}
					</Typography>
				}
			/>
			<Divider />

			{imageURL !== undefined && (
				<>
					<CardMedia
						component="img"
						image={imageURL}
						sx={{ objectFit: "contain", minWidth: "100%" }}
					/>
					<Divider />
				</>
			)}
			<Collapse in={isExpand} timeout="auto" unmountOnExit>
				<CardContent sx={{ mx: "1%" }}>{parse(content)}</CardContent>
			</Collapse>
			<Stack
				component={Button}
				direction={"row"}
				fullWidth
				justifyContent="center"
				onClick={handleExpandClick}
			>
				<ExpandMoreIcon
					aria-expanded={isExpand}
					aria-label="show more"
					expand={isExpand}
					sx={{ height: "32px" }}
				>
					<ExpandMore />
				</ExpandMoreIcon>
				<Typography alignContent={"center"} variant="h6">
					{isExpand ? "Ukryj informacje" : "Pokaż informacje"}
				</Typography>
				<ExpandMoreIcon
					aria-expanded={isExpand}
					aria-label="show more"
					expand={isExpand}
					sx={{ height: "32px" }}
				>
					<ExpandMore />
				</ExpandMoreIcon>
			</Stack>
		</Card>
	);
}

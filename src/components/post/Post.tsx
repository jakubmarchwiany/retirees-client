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

import { ExpandMoreIcon } from "../my/ExpandMore";
import { PostType } from "./post.type";

dayjs.extend(relativeTime);

dayjs.locale("pl");

export default function Post({
	isTrip,
	title,
	startDate,
	endDate,
	imageURL,
	content
}: PostType): JSX.Element {
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = (): void => {
		setExpanded(!expanded);
	};

	const isSameDay = (): boolean => {
		if (dayjs(startDate).isSame(endDate, "day")) {
			return true;
		} else {
			return false;
		}
	};

	const subheader = (): string => {
		if (isTrip) {
			if (isSameDay()) {
				return `Data rozpoczęcia [ ${dayjs(startDate).format(
					"DD.MM.YYYY"
				)} ] [ jednodniowa ] [ ${dayjs(startDate).fromNow()} ]`;
			} else {
				return `Data rozpoczęcia [ ${dayjs(startDate).format("DD.MM.YY")} ] do [ ${dayjs(
					endDate
				).format("DD.MM.YY")} ] [ ${dayjs(startDate).fromNow()} ]`;
			}
		} else {
			return `Data  [ ${dayjs(startDate).format("DD.MM.YYYY")} ]`;
		}
	};

	return (
		<Card
			sx={{
				width: "100%",
				borderRadius: 2,
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
				title={<Typography sx={{ typography: { xs: "h6", sm: "h4" } }}>{title}</Typography>}
			/>
			<Divider />

			{isTrip && (
				<>
					<CardMedia
						component="img"
						image={imageURL}
						sx={{ objectFit: "contain", minWidth: "100%" }}
					/>
					<Divider />
				</>
			)}
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent sx={{ mx: "2%", my: "2%" }}>{parse(content)}</CardContent>
			</Collapse>
			<Stack
				component={Button}
				direction={"row"}
				fullWidth
				justifyContent="center"
				onClick={handleExpandClick}
			>
				<ExpandMoreIcon
					aria-expanded={expanded}
					aria-label="show more"
					expand={expanded}
					sx={{ height: "32px" }}
				>
					<ExpandMore />
				</ExpandMoreIcon>
				<Typography alignContent={"center"} variant="h6">
					{expanded ? "Ukryj informacje" : "Pokaż informacje"}
				</Typography>
				<ExpandMoreIcon
					aria-expanded={expanded}
					aria-label="show more"
					expand={expanded}
					sx={{ height: "32px" }}
				>
					<ExpandMore />
				</ExpandMoreIcon>
			</Stack>
		</Card>
	);
}

"use client";

import { ExpandMore } from "@mui/icons-material";
import { Button, CardContent, Collapse, Stack, Typography } from "@mui/material";
import parse from "html-react-parser";
import React, { useState } from "react";

import { ExpandMoreIcon } from "./ExpandMore";

type Props = {
	content: string;
};

export default function PostContent({ content }: Props): JSX.Element {
	const [isExpand, setIsExpand] = useState(false);

	const handleExpandClick = (): void => {
		setIsExpand(!isExpand);
	};

	return (
		<>
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
		</>
	);
}

"use client";

import Post from "@/components/post/Post";
import { DatePicker } from "@mui/lab";
import {
	Container,
	Stack,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography
} from "@mui/material";
import { LocalizationProvider, MobileDatePicker, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

export default function NewPostPage(): JSX.Element {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState(""); // Store the Quill content

	const [cropData, setCropData] = useState(undefined);
	const [startDate, setStartDate] = useState<Dayjs>(undefined);

	const [endDate, setEndDate] = useState<Dayjs | undefined>(undefined);

	const [isExpand, setIsExpand] = useState(true);
	const [isTrip, setIsTrip] = useState(true);

	const modules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5] }],
			[{ color: [] }, { background: [] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
			[{ align: [] }],
			["link"],
			["clean"]
		]
	};

	return (
		<Container component="main">
			<Stack alignItems="center" justifyContent="center">
				<Typography component="h1" mb={2} variant="h2">
					Nowa
				</Typography>
				<ToggleButtonGroup
					color="secondary"
					exclusive
					fullWidth
					onChange={(event, value: boolean): void => {
						setIsTrip(value);
					}}
					value={isTrip}
				>
					<ToggleButton value={true}>Wycieczka</ToggleButton>
					<ToggleButton value={false}>Informacja</ToggleButton>
				</ToggleButtonGroup>

				<TextField
					autoFocus={true}
					label={"Tytuł"}
					name="title"
					onChange={(e): void => {
						setTitle(e.target.value);
					}}
					sx={{ mb: 3, width: "60%" }}
					value={title}
				/>

				<Stack direction={"row"} justifyContent={"center"} mb={2} spacing={5}>
					<DatePicker
						label={isTrip ? "Data rozpoczęcia" : "Data"}
						minDate={new Date()}
						onChange={(newValue: string): void => {
							setStartDate(dayjs(newValue));
						}}
						renderInput={(params): void => (
							<TextField
								{...params}
								sx={{
									svg: { color: "secondary.main" },
									input: { color: "secondary.main" },
									label: { color: "secondary.main" }
								}}
							/>
						)}
						value={startDate}
					/>
					<Typography mt={2} textAlign="center" variant="h4">
						Data
					</Typography>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<MobileDatePicker
							// ampm={false}
							defaultValue={startDate}
							onChange={(newValue): void => {
								newValue && setStartDate(newValue);
							}}
							// sx={{ width: "165px", mt: 1 }}
						/>
					</LocalizationProvider>
					{/* {isTrip && (
						<DatePicker
							label="Data zakończenia"
							minDate={startDate}
							onChange={(newValue) => {
								setEndDate(dayjs(newValue));
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									sx={{
										svg: { color: "secondary.main" },
										input: { color: "secondary.main" },
										label: { color: "secondary.main" }
									}}
								/>
							)}
							value={endDate}
						/>
					)} */}
				</Stack>
				{/* {isTrip && <ImageOptions cropData={cropData} setCropData={setCropData} />} */}

				{/* <div style={{ background: "white" }}>
					<ReactQuill
						modules={modules}
						onChange={setContent}
						style={{
							color: "black",
							background: "white",
							height: "30vh",
							marginBottom: "100px"
						}}
						theme="snow"
						value={content}
					/>
				</div> */}

				<Post
					content={content}
					endDate={dayjs().toISOString()}
					id={"1"}
					imageURL=""
					isTrip={isTrip}
					startDate={dayjs().toISOString()}
					title={title}
				/>
			</Stack>
		</Container>
	);
}

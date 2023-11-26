import { Card, CardHeader, Container, Divider, Skeleton, Stack } from "@mui/material";

export default function Loading(): JSX.Element {
	return (
		<Container component="main">
			<Stack spacing={{ xs: 1, sm: 1.5, lg: 2 }}>
				<Stack spacing={{ xs: 1, sm: 1.5, lg: 2 }}>
					{Array.from({ length: 3 }, (_, index) => (
						<Card
							key={index}
							sx={{
								width: "100%",
								borderRadius: 2,
								backgroundColor: "rgba(255, 255, 255, 0.15)"
							}}
						>
							<CardHeader
								subheader={
									<Skeleton
										animation="wave"
										height={32}
										variant="rounded"
										width="20%"
									/>
								}
								title={
									<Skeleton
										animation="wave"
										height={40}
										sx={{ mb: 1 }}
										variant="rounded"
										width="40%"
									/>
								}
							/>
							<Divider />

							<Skeleton
								animation="wave"
								height={150}
								sx={{ my: 2, ml: "5%" }}
								variant="rounded"
								width="90%"
							/>
						</Card>
					))}
				</Stack>
			</Stack>
		</Container>
	);
}

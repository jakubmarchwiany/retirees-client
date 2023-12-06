import { Card, CardHeader, Container, Divider, Skeleton, Stack } from "@mui/material";

export default function Loading(): JSX.Element {
	return (
		<Container component="main">
			<Stack spacing={{ lg: 2, sm: 1.5, xs: 1 }}>
				<Stack spacing={{ lg: 2, sm: 1.5, xs: 1 }}>
					{Array.from({ length: 3 }, (_, index) => (
						<Card
							key={index}
							sx={{
								backgroundColor: "rgba(255, 255, 255, 0.15)",
								borderRadius: 2,
								width: "100%"
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
								sx={{ ml: "5%", my: 2 }}
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

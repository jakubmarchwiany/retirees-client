"use client";

import { Pagination } from "@mui/material";
import { useRouter } from "next/navigation";

type Props = {
	currentPage: number;
	numberOfPages: number;
};

export default function PostsPagination({ currentPage, numberOfPages }: Props): JSX.Element {
	const router = useRouter();

	return (
		<Pagination
			count={numberOfPages}
			onChange={(event: React.ChangeEvent<unknown>, value: number): void => {
				router.push(`?currentPage=${value}`);
			}}
			page={currentPage}
			shape="rounded"
			size="large"
		/>
	);
}

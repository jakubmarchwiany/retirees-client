import { Timestamp } from "firebase/firestore";

export type PostFirebaseType = {
	title: string;
	startDate: Timestamp;
	endDate: Timestamp | null;
	createdDate: Timestamp;
	image: null | string;
	content: string;
};

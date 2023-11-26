import { Dayjs } from "dayjs";
import toast from "react-hot-toast";

export function postValidation(title: string, startDate: Dayjs | null, content: string): boolean {
	if (title === "") {
		toast.error("Musisz wprowadzić tytuł posta");

		return false;
	}
	if (title.length < 3) {
		toast.error("Tytuł posta nie może być krótszy niż 3 znaki");

		return false;
	}
	if (title.length > 40) {
		toast.error("Tytuł posta nie może być dłuższy niż 40 znaków");

		return false;
	}
	if (startDate === null) {
		toast.error("Musisz wybrać datę");

		return false;
	}
	if (content === "") {
		toast.error("Musisz wprowadzić treść posta");

		return false;
	}

	if (content.length < 10) {
		toast.error("Treść posta nie może być krótsza niż 10 znaków");

		return false;
	}

	return true;
}

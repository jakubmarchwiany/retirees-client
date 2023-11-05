export function getErrorMessage(e: unknown): string {
	let errorMessage = "Coś poszło nie tak";

	if (e instanceof Error) {
		errorMessage = e.message;
	}
	return errorMessage;
}

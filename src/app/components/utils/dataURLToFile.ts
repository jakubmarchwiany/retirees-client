export function dataURLtoFile(dataUrl: string, filename: string): File | null {
	// Split the data URL into two parts: metadata and data
	const parts = dataUrl.split("base64,");

	if (parts.length !== 2) {
		// Invalid data URL format
		return null;
	}

	const [metadata, data] = parts;

	// Extract the MIME type from the metadata
	if (metadata !== undefined && data !== undefined) {
		const mimeMatch = metadata.match(/:(.*?);/);

		if (mimeMatch === null) {
			// Invalid MIME type
			return null;
		}

		const mimeType = mimeMatch[1];

		// Convert the base64 data to a Uint8Array
		const byteString = atob(data);
		const dataArray = new Uint8Array(byteString.length);

		for (let i = 0; i < byteString.length; i++) {
			dataArray[i] = byteString.charCodeAt(i);
		}

		// Create a Blob from the Uint8Array data
		const blob = new Blob([dataArray], { type: mimeType });

		// Create a File from the Blob
		const file = new File([blob], filename, { type: mimeType });

		return file;
	} else {
		return null;
	}
}

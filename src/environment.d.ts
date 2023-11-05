/* eslint-disable @typescript-eslint/consistent-type-definitions */
namespace NodeJS {
	interface ProcessEnv {
		ADMIN_PASSWORD: string;
		ADMIN_USERNAME: string;
		GOOGLE_BUCKET_IMAGES_URL: string;
		GOOGLE_BUCKET_NAME: string;
		GOOGLE_KEY_FILE_NAME: string;
		GOOGLE_PROJECT_ID: string;
		JWT_SECRET: string;
		NEXT_PUBLIC_API_ENDPOINT: string;
	}
}

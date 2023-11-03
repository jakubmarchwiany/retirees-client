/* eslint-disable @typescript-eslint/consistent-type-definitions */
namespace NodeJS {
	interface ProcessEnv {
		ADMIN_PASSWORD: string;
		ADMIN_USERNAME: string;
		GOOGLE_BUCKET_NAME: string;
		JWT_SECRET: string;
		KEY_FILE_NAME: string;
		NEXT_PUBLIC_API_ENDPOINT: string;
		PROJECT_ID: string;
	}
}

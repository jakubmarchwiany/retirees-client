export { };
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            POSTS_FILE_NAME: string;
            POSTS_FOLDER: string;
            GOOGLE_BUCKET_URL: string;
            NEXT_PUBLIC_DEV_BACKEND_URL: string;
        }
    }
}

import { cleanEnv, str } from "envalid";

function validateEnv() {
    cleanEnv(process.env, {
        POSTS_FILE_NAME: str(),
        POSTS_FOLDER: str(),
        GOOGLE_BUCKET_URL: str(),
        NEXT_PUBLIC_DEV_BACKEND_URL: str(),
    });
}
export default validateEnv;

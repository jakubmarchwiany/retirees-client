import { cleanEnv, str } from "envalid";

function validateEnv() {
  cleanEnv(process.env, {
    NEXT_PUBLIC_ENV: str(),
    NEXT_PUBLIC_DEV_API_ENDPOINT: str(),
    NEXT_PUBLIC_POST_IMAGE_PATH: str(),
  });
}
export default validateEnv;

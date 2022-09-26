export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      //running type
      NEXT_PUBLIC_ENV: "development" | "production";
      NEXT_PUBLIC_DEV_API_ENDPOINT: string;
      NEXT_PUBLIC_POST_IMAGE_PATH: string;
    }
  }
}

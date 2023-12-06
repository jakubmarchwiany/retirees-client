import { PostType } from "@/types/post.type";
import { Storage } from "@google-cloud/storage";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

const { NODE_ENV, GOOGLE_KEY_FILE_NAME, GOOGLE_PROJECT_ID, GOOGLE_BUCKET_NAME } = process.env;

const storage = new Storage({ keyFilename: GOOGLE_KEY_FILE_NAME, projectId: GOOGLE_PROJECT_ID });

const bucket = storage.bucket(GOOGLE_BUCKET_NAME);

async function downloadPostsFromBucket(): Promise<PostType[]> {
	const data = await bucket.file(`${NODE_ENV}/posts_data.json`).download();

	return JSON.parse(data.toString()) as PostType[];
}

async function savePostsToBucket(data: PostType[]): Promise<void> {
	const file = bucket.file(`${NODE_ENV}/posts_data.json`);

	const content = JSON.stringify(data);

	await file.save(content, {
		metadata: { cacheControl: "no-store" }
	});
}

async function uploadPostImageToBucket(buffer: Buffer): Promise<string> {
	const convertedImage = await sharp(buffer)
		.resize(1920, 1080, { fit: "fill" })
		.webp({ quality: 90 })
		.toBuffer();

	const uniqueName = uuidv4() + ".webp";
	const imageFile = bucket.file(`${NODE_ENV}/posts_images/${uniqueName}`);

	await imageFile.save(convertedImage);

	return uniqueName;
}

async function deletePostImageFromBucket(imageName: string): Promise<void> {
	const file = bucket.file(`${NODE_ENV}/posts_images/${imageName}`);

	await file.delete();
}

export {
	deletePostImageFromBucket,
	downloadPostsFromBucket,
	savePostsToBucket,
	uploadPostImageToBucket
};

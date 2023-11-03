/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PostType } from "@/components/post/post.type";
import { Storage } from "@google-cloud/storage";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

const { NODE_ENV, PROJECT_ID, KEY_FILE_NAME, GOOGLE_BUCKET_NAME, POSTS_FOLDER, POSTS_FILE_NAME } =
	process.env;

class GoogleBot {
	private readonly storage;
	private readonly imageBucket;

	constructor() {
		this.storage = new Storage({
			projectId: PROJECT_ID,
			keyFilename: KEY_FILE_NAME
		});

		this.imageBucket = this.storage.bucket(GOOGLE_BUCKET_NAME);
	}

	public updateJsonPostFile = async (data: PostType): Promise<void> => {
		const file = this.imageBucket.file(`${NODE_ENV}/${POSTS_FILE_NAME}`);

		const content = JSON.stringify(data);

		await file.save(content, {
			metadata: { cacheControl: "no-store" }
		});
	};

	public uploadPostImageToBucket = async (buffer: Buffer): Promise<string> => {
		const convertedImage = await sharp(buffer)
			.resize(1920, 1080, { fit: "fill" })
			.webp({ quality: 90 })
			.toBuffer();

		const uniqueName = uuidv4() + ".webp";
		const imageFile = this.imageBucket.file(`${NODE_ENV}/posts/${uniqueName}`);

		await imageFile.save(convertedImage);

		return uniqueName;
	};

	public deletePostImageFromBucket = async (imageName: string): Promise<void> => {
		const file = this.imageBucket.file(`${NODE_ENV}/posts/${imageName}`);

		await file.delete();
	};
}
export default GoogleBot;

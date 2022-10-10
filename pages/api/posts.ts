/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";
import { PostType } from "../../src/components/Post";

const NODE_ENV = process.env.NODE_ENV;
const POSTS_FILE_NAME = process.env.POSTS_FILE_NAME;
const POSTS_FOLDER = process.env.POSTS_FOLDER;
const GOOGLE_BUCKET_URL = process.env.GOOGLE_BUCKET_URL;

type PostData = {
  id: string;
  isTrip: boolean;
  title: string;
  startDate: Date;
  endDate: Date;
  imageID: string;
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostType[] | {}>
) {
  try {
    let response = await fetch(
      `${GOOGLE_BUCKET_URL}/${NODE_ENV}/${POSTS_FILE_NAME}`
    );
    if (response.ok) {
      let data = await response.json();

      data = data.map((post: PostData) => {
        return Object.assign(post, {
          id: post.id,
          isTrip: post.isTrip,
          title: post.title,
          startDate: post.startDate,
          endDate: post.endDate,
          imageURL:
            `${GOOGLE_BUCKET_URL}/${NODE_ENV}/${POSTS_FOLDER}/` + post.imageID,
          content: post.content,
        }) as PostType;
      });
      res.status(200).send(data);
    } else {
      res.status(500).send([]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send([]);
  }
}

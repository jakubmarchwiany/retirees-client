/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import fs from "fs";

const file = fs.readFileSync(process.cwd() + "/firebase_config.json", "utf8");

const firebaseConfig = JSON.parse(file);

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

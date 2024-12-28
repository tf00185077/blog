// const admin = require("firebase-admin");
// const serviceAccount = require("./path/to/serviceAccountKey.json"); // 服務賬戶密鑰文件
import admin from "firebase-admin";
// import serviceAccount from "./blog-bbce7-firebase-adminsdk-v8tcw-70aca762da.json";
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    storageBucket: process.env.FIREBASE_BUCKET_NAME,
  });
}

// 獲取存儲桶引用
const bucket = admin.storage().bucket(process.env.FIREBASE_BUCKET_NAME);

export { bucket };
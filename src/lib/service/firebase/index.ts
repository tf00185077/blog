// const admin = require("firebase-admin");
// const serviceAccount = require("./path/to/serviceAccountKey.json"); // 服務賬戶密鑰文件
import admin from "firebase-admin";
import serviceAccount from "./blog-bbce7-firebase-adminsdk-v8tcw-70aca762da.json";
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

// 獲取存儲桶引用
const bucket = admin.storage().bucket("blog-bbce7.firebasestorage.app");

export { bucket };
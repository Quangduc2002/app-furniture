import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { useState } from "react";
import { v4 as uuid } from 'uuid';
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain:  process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId:  process.env.PROJECT_ID,
  storageBucket:  process.env.STORAGE_BUCKET,
  messagingSenderId:  process.env.MESSAGING_SENDER_ID,
  appId:  process.env.APP_ID,
  measurementId:  process.env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const useImageUpload = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
   const uploadImage = async (file: any,) => {
    if (!file) return;
    const storageRef = ref(storage, `Images/${uuid()}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(storageRef).then((url) => {
        setImageUrl(url);
      });
    });
  };
  return { imageUrl ,uploadImage};
}


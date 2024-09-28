import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const useImageUpload = () => {
  const [loading, setLoading] = useState(false);
  const uploadImage = async (file: any) => {
    if (!file) return;
    setLoading(true);
    try {
      const storageRef = ref(storage, `Images/${uuid()}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, uploadImage };
};

export const DeleteFileImage = async (filePath: string) => {
  const segments = decodeURIComponent(filePath).split('/');
  const pathId = segments[segments.length - 1].split('?')[0];
  const fileRef = ref(storage, `Images/${pathId}`);

  try {
    await deleteObject(fileRef);
    console.log('File deleted successfully.');
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
  listAll,
} from "firebase/storage";
import path from "path";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase.js";

initializeApp(firebaseConfig);

export const saveProductInFirebase = async (files) => {
  const storage = getStorage();
  const imgExtension = path.extname(files[0].originalname);
  const stlExtension = path.extname(files[1].originalname);
  const storageImgRef = ref(storage, `img/${Date.now() + imgExtension}`);
  const storageStlRef = ref(storage, `stl/${Date.now() + stlExtension}`);
  const snapshotImg = await uploadBytesResumable(
    storageImgRef,
    files[0].buffer
  );
  const snapshotStl = await uploadBytesResumable(
    storageStlRef,
    files[1].buffer
  );
  return {
    pathImg: storageImgRef.fullPath,
    pathStl: storageStlRef.fullPath,
    downloadImg: await getDownloadURL(snapshotImg.ref),
    downloadStl: await getDownloadURL(snapshotStl.ref),
  };
};

export const deleProductFromFirebase = async (pathImg, pathStl) => {
  try {
    const storage = getStorage();
    const imgRef = ref(storage, pathImg);
    const stlRef = ref(storage, pathStl);
    await deleteObject(imgRef);
    await deleteObject(stlRef);
  } catch (error) {
    console.log(error);
  }
};

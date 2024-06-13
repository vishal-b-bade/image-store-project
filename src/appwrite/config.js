import { Client, Databases, Storage, Query, ID } from "appwrite";
import {
  appwriteUrl,
  appwriteProjectId,
  appwriteDatabaseId,
  appwriteCollectionId,
  appwriteBucketId,
} from "../conf/conf.js";

const client = new Client();
client.setEndpoint(appwriteUrl).setProject(appwriteProjectId);

const database = new Databases(client);
const storage = new Storage(client);


// document service
const createDocument = async ({ email, imageId }) => {
  try {
    return await database.createDocument(
      appwriteDatabaseId,
      appwriteCollectionId,
      ID.unique(),
      {
        email,
        imageId,
      }
    );
  } catch (error) {
    console.log("Appwrite :: createDocument :: Error ", error);
  }
};

const getDocument = async (documentId) => {
  try {
    return await database.listDocuments(
      appwriteDatabaseId,
      appwriteCollectionId,
      documentId
    );
  } catch (error) {
    console.log("Appwrite :: getDocument :: Error ", error);
  }
};

const documentsList = async (email) => {
  // console.log(email);
  try {
    return await database.listDocuments(
      appwriteDatabaseId,
      appwriteCollectionId,
      [Query.equal("email", email)]
    );
  } catch (error) {
    console.log("Appwrite :: documentsList :: Error ", error);
  }
};

const deleteDocument = async (documentId) => {
  try {
    await database.deleteDocument(
      appwriteDatabaseId,
      appwriteCollectionId,
      documentId
    );
  } catch (error) {
    console.log("Appwrite :: deleteFile :: Error ", error);
  }
};


// file service
const createFile = async (file) => {
  try {
    return await storage.createFile(appwriteBucketId, ID.unique(), file);
  } catch (error) {
    console.log("Appwrite :: createFile :: Error ", error);
  }
};

const getFilePreview = async (fileId) => {
  try {
    return storage.getFilePreview(appwriteBucketId, fileId);
  } catch (error) {
    console.log("Appwrite :: getFilePreview :: Error ", error);
  }
};

const deleteFile = async (fileId) => {
  try {
    await storage.deleteFile(appwriteBucketId, fileId);
  } catch (error) {
    console.log("Appwrite :: deleteFile :: Error ", error);
  }
};

const downloadFile = async (fileId) => {
  try {
    const file = storage.getFileDownload(appwriteBucketId, fileId);
    // console.log(file.href);
    return file;
    // return file.href;
  } catch (error) {
    console.log("Appwrite :: downloadFile :: Error ", error);
  }
};

export {
  createDocument,
  getDocument,
  documentsList,
  deleteDocument,
  createFile,
  getFilePreview,
  deleteFile,
  downloadFile,
};

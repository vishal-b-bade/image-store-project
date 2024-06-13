const appwriteUrl = String(import.meta.env.VITE_APPWRITE_URL);
const appwriteProjectId = String(import.meta.env.VITE_APPWRITE_PROJECT_ID);
const appwriteDatabaseId = String(import.meta.env.VITE_APPWRITE_DATABASE_ID);
const appwriteCollectionId = String(import.meta.env.VITE_APPWRITE_COLLECTION_ID);
const appwriteBucketId = String(import.meta.env.VITE_APPWRITE_BUCKET_ID);

export {
  appwriteUrl,
  appwriteProjectId,
  appwriteDatabaseId,
  appwriteCollectionId,
  appwriteBucketId,
};

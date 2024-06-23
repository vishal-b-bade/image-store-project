import { Client, Account, ID } from "appwrite";
import { appwriteUrl, appwriteProjectId } from "../conf/conf.js";

const client = new Client();
client.setEndpoint(appwriteUrl).setProject(appwriteProjectId);

const account = new Account(client);

const createAccount = async ({ email, password, name }) => {
  try {
    const user = await account.create(ID.unique(), email, password, name);
    // console.log(user);
    if (user) {
      return loginUser({ email, password });
    } else {
      return user;
    }
  } catch (error) {
    console.log("Appwrite :: createAccount :: Error ", error);
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const session = await account.createEmailSession(email, password);
    // console.log(session);
    return session;
  } catch (error) {
    console.log("Appwrite :: loginUser :: Error ", error);
  }
};

const getCurrentUser = async () => {
  try {
    // const currentUser = await account.get("current");
    const currentUser = await account.get();
    // console.log(currentUser);
    if (currentUser) {
      return currentUser;
    }
  } catch (error) {
    console.log("Appwrite :: getCurrentUser :: Error ", error);
  }
};

const emailVerify = async () => {
  try {
    const verifyLink = await account.createVerification(
      "http://localhost:5173/verify"
    );
    // console.log(verifyLink);
  } catch (error) {
    console.log("Appwrite :: logoutUser :: Error ", error);
  }
};

const updateVerify = async ({ userId, secret }) => {
  try {
    const verifyLink = await account.updateVerification(userId, secret);
    // console.log(verifyLink);
  } catch (error) {
    console.log("Appwrite :: logoutUser :: Error ", error);
  }
};

const logoutUser = async () => {
  try {
    const session = await account.deleteSessions();
    // console.log(session);
  } catch (error) {
    console.log("Appwrite :: logoutUser :: Error ", error);
  }
};

export {
  createAccount,
  loginUser,
  getCurrentUser,
  logoutUser,
  emailVerify,
  updateVerify,
};

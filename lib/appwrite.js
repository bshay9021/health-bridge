import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aora',
    projectId: '6663a305003587783c53',
    databaseId: '6663a4110018161793f1',
    userCollectionId: '6663a4280006ac09d468',
    videoCollectionId: '6663a449002aceb7dacd',
    storageId: '6663a55400109bee071e'
}



// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)

    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)
        const newUser = await databases.createDocument(config.databaseId, config.userCollectionId, ID.unique(), {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        })
        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if(!currentUser) throw Error;
        return currentUser.documents[0]
    } catch (error) {
        console.log(error);
    }
}

export const getUserSession = async () => {
    try {
        const result = await account.getSession('current');
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const logoutUser = async () => {
    try {
        const result = await account.deleteSession('current');
        return result;
    } catch (error) {
        console.log(error);
    }
}

// track the searches made by the user

import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client().setEndpoint("https://cloud.appwrite.io/v1").setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) =>{
    try{
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('searchTerm', query)]
    )

    console.log(result);
    // Check if the record is already stored
    if(result.documents.length > 0){
        const existingMovie = result.documents[0];
        await database.updateDocument(DATABASE_ID, COLLECTION_ID, existingMovie.$id,{
            count: existingMovie.count + 1
        })
    } else {
        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            searchTerm: query,
            movie_id: movie?.id,
            count: 1,
            poster_url: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            title: movie.title
        })
    }
} catch(error){
    console.log(error);
    throw error;
}
    // found then increase the count
    //  not found -> create a new document in AppWrotye database
}
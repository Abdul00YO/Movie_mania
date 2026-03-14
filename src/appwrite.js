import { Client, ID, Query, TablesDB, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://sgp.cloud.appwrite.io/v1")
  .setProject("69b443f200031e2bc151");

export const account = new Account(client);
export const tablesDB = new TablesDB(client);

// IDs from Appwrite
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID; // this is your table id

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    // check if search term already exists
    const result = await tablesDB.listRows(DATABASE_ID, TABLE_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);

    if (result.rows.length > 0) {
      const row = result.rows[0];

      // update count
      await tablesDB.updateRow(
        DATABASE_ID,
        TABLE_ID,
        row.$id,
        {
          count: row.count + 1,
        }
      );

    } else {

      // create new row
      await tablesDB.createRow(
        DATABASE_ID,
        TABLE_ID,
        ID.unique(),
        {
          searchTerm: searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }
      );
    }

  } catch (error) {
    console.log("Appwrite error:", error);
  }
};
export const getTrendingMovies= async () => {
  try {
    const result = await tablesDB.listRows(DATABASE_ID, TABLE_ID, [
        Query.orderDesc("count"),
        Query.limit(5)
    ]);
    return result.rows;
  } catch (error) {
    console.log("Appwrite error:", error);
    return [];
  }
};
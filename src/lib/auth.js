import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.AUTH_DB_URI);

export const auth = betterAuth({
   
    // authentication
    emailAndPassword: {
        enabled: true, 
        minPasswordLength: 8,
        maxPasswordLength: 128,
    },

    // database
    database: mongodbAdapter(db, {
        client
    }),

    // extra role fields catch
    user: {
       additionalFields: {
        role:{
            default: "seeker"
        }
        }
    }
});
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if(!uri){
    console.log("Connection To DB Failed, Credentials Error")
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    var _mongoClientPromise : Promise<MongoClient>
}

if(!global._mongoClientPromise){
    console.log("no global instance")
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise
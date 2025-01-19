import { MongoClient, ServerApiVersion } from 'mongodb';




/* const uri = process.env.MONGODB_URI; */
const uri = "mongodb+srv://projetcirinfo:bBGLpmtEiGyWCLSY@projetcir3.yp4fi.mongodb.net/?retryWrites=true&w=majority&appName=ProjetCIR3";


if (!uri) {
    throw new Error('La variable d\'environnement MONGODB_URI n\'est pas définie');
}



const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const clientPromise = client.connect();

export default clientPromise;

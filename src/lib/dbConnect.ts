import mongoose from 'mongoose';

if (!process.env.MONGODB_PASSWORD) {
    throw new Error('La variable d\'environnement MONGODB_PASSWORD n\'est pas définie');
}

const mongoURI = `mongodb+srv://projetcirinfo:${process.env.MONGODB_PASSWORD}@projetcir3.yp4fi.mongodb.net/onepisen?retryWrites=true&w=majority&appName=ProjetCIR3`;

let isConnected = 0; // Pour suivre l'état de la connexion

async function dbConnect() {
    if (isConnected) {
        console.info('Already connected to MongoDB');
        return;
    }

    if (mongoose.connection.readyState) {
        isConnected = mongoose.connection.readyState;
        console.info('Using existing MongoDB connection');
        return;
    }

    try {
        await mongoose.connect(mongoURI);
        mongoose.connection.useDb('onepisen');
        isConnected = mongoose.connection.readyState;
        console.info('Connected to MongoDB', isConnected);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('MongoDB connection failed');
    }
}

export default dbConnect;
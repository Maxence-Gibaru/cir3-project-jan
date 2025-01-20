import mongoose from 'mongoose';

if (!process.env.MONGODB_PASSWORD) {
    throw new Error('La variable d\'environnement MONGODB_URI n\'est pas définie');
}

const mongoURI = `mongodb+srv://projetcirinfo:${process.env.MONGODB_PASSWORD}@projetcir3.yp4fi.mongodb.net/?retryWrites=true&w=majority&appName=ProjetCIR3`;

let isConnected = 0; // Pour suivre l'état de la connexion

async function dbConnect() {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return;
  }

  if (mongoose.connection.readyState) {
    isConnected = mongoose.connection.readyState;
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    const db = await mongoose.connect(mongoURI);
    isConnected = db.connection.readyState;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('MongoDB connection failed');
  }
}

export default dbConnect;
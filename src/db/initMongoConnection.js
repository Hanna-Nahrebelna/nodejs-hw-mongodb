import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;

const mongoURI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

const initMongoConnection = async () => {
  try {
    await mongoose.connect((mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false // Додати це для вимкнення буферизації команд
    }));
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default initMongoConnection;

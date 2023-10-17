import mongoose from 'mongoose';
import 'dotenv/config';


const connectDb = async () => {
  
  // const url = ``;
  const url = process.env.MONGO_URI;
  const connectionParams = {
    useNewUrlParser: true,
  };
  try {
    // await mongoose.connect(URL, {
    //   useNewUrlParser: true,
    //   useFindAndModify: true,
    //   useCreateIndex: true,
    //   useUnifiedTopology: true,
    // });
    await mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });
    console.log('MongoDb is connected');
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;

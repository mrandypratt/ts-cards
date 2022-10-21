

export const getMongoURI = (): string => {
  let mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error(`MongoURI Does Not Exist:\nNODE_ENV: ${process.env.NODE_ENV}\nMongoURI: ${mongoURI}`)
    mongoURI = "";
  }
  console.log(process.env.NODE_ENV);
  console.log("dev");

  switch (process.env.NODE_ENV) {
    case "prod":
      mongoURI += "CardsWithFriends?retryWrites=true&w=majority";
      break;
    case "dev":
      mongoURI += "CardsWithFriendsTest?retryWrites=true&w=majority";
      break;
    case "test":
      mongoURI += "CardsWithFriendsTest?retryWrites=true&w=majority";
      break;
    default:
      console.error(`NODE_ENV is not a Valid Value:\nNODE_ENV: ${process.env.NODE_ENV}\nMongoURI: ${mongoURI}`)
      mongoURI = ""
  }

  return mongoURI;
}
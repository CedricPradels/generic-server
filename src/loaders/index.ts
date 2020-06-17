import mongooseLoader from "./mongoose";
import expressLoader from "./express";

const loaders = async () => {
  return {
    app: expressLoader(),
    db: await mongooseLoader(),
  };
};

export default loaders;

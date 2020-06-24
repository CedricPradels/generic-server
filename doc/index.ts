import user from "./user";

const doc = {
  openapi: "3.0.0",
  info: {
    version: "0.0.0",
    title: "Generic Server",
    description: "Generic server for my new projects",
    contact: {
      name: "Cédric Pradels",
      email: "cedric.pradels@gmail.com",
    },
  },
  externalDocs: {
    description: "Github of the project",
    url: "https://github.com/CedricPradels/generic-server",
  },
  servers: [
    {
      url: "http://localhost:3000/",
      description: "Server",
    },
  ],
  tags: [
    {
      name: "User",
    },
  ],
  paths: {
    ...user,
  },
};

export default doc;

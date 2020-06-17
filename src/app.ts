import loaders from "./loaders";

const startServer = async () => {
  const { app } = await loaders();

  app.all("*", (req, res) => {
    res.json({ message: "Page not found" });
  });

  app.listen(process.env.PORT || 4000, () => {
    console.log("Server's started.");
  });
};

startServer();

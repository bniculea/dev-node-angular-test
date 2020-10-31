const Hapi = require("@hapi/hapi");
const mongoose = require("mongoose");
// server.register({
//     register: require('./defaultRoutes')
// })

const start = async function () {
  const server = new Hapi.Server({
    port: 3000,
    host: "localhost",
  });

  await server.register([
    {
      plugin: require("./defaultRoutes"),
    },
  ]);
  await server.start();

  console.log(`Server running at: ${server.info.uri}`);
};

mongoose.connect("mongodb://localhost:27017/", {
  useNewUrlParser: true,
});

start();

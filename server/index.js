const Hapi = require("@hapi/hapi");
const mongoose = require("mongoose");
// server.register({
//     register: require('./defaultRoutes')
// })

const start = async function () {
  const server = new Hapi.Server({
    port: 3000,
    host: "0.0.0.0",
  });

  await server.register([
    {
      plugin: require("./defaultRoutes"),
    },
  ]);
  await server.start();

  console.log(`Server running at: ${server.info.uri}`);
};

mongoose.connect("mongodb://mongo:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

start();

const Hapi = require("@hapi/hapi");

// server.register({
//     register: require('./defaultRoutes')
// })

const start = async function () {
  const server = new Hapi.Server({
    port: 3000,
    host: "localhost",
  });

  await server.register(require("./defaultRoutes"));
  await server.start();

  console.log(`Server running at: ${server.info.uri}`);
};

start();

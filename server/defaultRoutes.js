"use strict";

const defaultRoutes = {
  name: "defaultRoutes",
  version: "1.0.0",
  register: async function (server, options) {
    server.route({
      method: "GET",
      path: "/",
      handler: function (request, h) {
        return "Hello from the TTY side";
      },
    });
  },
};

module.exports = defaultRoutes;

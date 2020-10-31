"use strict";
const Mongoose = require("mongoose");

const defaultRoutes = {
  name: "defaultRoutes",
  version: "1.0.0",
  register: async function (server, options) {
    server.route({
      method: "GET",
      path: "/health",
      handler: async (req, h) => {
        if (Mongoose.connection.readyState === 1) {
          return h.response("OK").code(200);
        } else {
          return h.response().code(503);
        }
      },
    });
  },
};

module.exports = defaultRoutes;

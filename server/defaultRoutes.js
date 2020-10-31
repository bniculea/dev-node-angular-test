"use strict";
const Mongoose = require("mongoose");
const User = require("./db/models/User");
const { generateRandomUsers } = require("./db/data");

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

    server.route({
      method: "POST",
      path: "/create",
      handler: async (req, h) => {
        try {
          await User.insertMany(generateRandomUsers());
          return h.response("CREATED").code(201);
        } catch (err) {
          return h.response("COULD NOT CREATE").code(503);
        }
      },
    });
  },
};

module.exports = defaultRoutes;

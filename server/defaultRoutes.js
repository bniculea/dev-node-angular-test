"use strict";
const Mongoose = require("mongoose");
const User = require("./db/models/User");
const {
  generateRandomUsers,
  computeAverageOfAgePerUserCountry,
} = require("./db/data");
const { performance } = require("perf_hooks");

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

    server.route({
      method: "GET",
      path: "/time",
      handler: async (req, h) => {
        try {
          const t0 = performance.now();
          const _ = await computeAverageOfAgePerUserCountry();
          const t1 = performance.now();
          return h.response(t1 - t0).code(200);
        } catch (err) {
          return h
            .response(
              "Something bad happened on our side! Please try again later."
            )
            .code(503);
        }
      },
    });
  },
};

module.exports = defaultRoutes;

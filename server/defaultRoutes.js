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
          const response = { mongoState: "UP" };
          return h.response(response).code(200);
        } else {
          const response = { mongoState: "DOWN" };
          return h.response(response).code(503);
        }
      },
    });

    server.route({
      method: "POST",
      path: "/create",
      handler: async (req, h) => {
        try {
          await User.insertMany(generateRandomUsers());
          const response = { message: "Successfully generated data" };
          return h.response(response).code(201);
        } catch (err) {
          const response = {
            message: "There was a problem while generating data",
          };
          return h.response(response).code(503);
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
          const durationTime = t1 - t0;
          const response = { duration: durationTime };
          return h.response(response).code(200);
        } catch (err) {
          const response = {
            message:
              "Something bad happened on our side! Please try again later.",
          };
          return h.response(response).code(503);
        }
      },
    });
  },
};

module.exports = defaultRoutes;

const faker = require("faker");
const User = require("../models/User");

const generateRandomUsers = () => {
  const maximumNumberOfUsers = 50;
  const minimumNumberOfUsers = 12;
  const minAge = 1;
  const maxAge = 100;
  const numberOfUsers = Math.floor(
    Math.random() * (maximumNumberOfUsers - minimumNumberOfUsers + 1) +
      minimumNumberOfUsers
  );
  const users = [];
  for (let i = 0; i < numberOfUsers; i++) {
    users.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      country: faker.address.country(),
      age: Math.floor(
        Math.random() * (maxAge - minAge + 1) + minimumNumberOfUsers
      ),
    });
  }
  return users;
};

const computeAverageOfAgePerUserCountry = () => {
  return User.aggregate([
    {
      $group: {
        _id: "$country",
        averageAge: { $avg: "$age" },
        total: { $sum: 1 },
      },
    },
    {
      $project: {
        country: "$country",
        averageAgePeriod: {
          $cond: [{ $lte: ["$averageAge", 50] }, "Young", "Old"],
        },
        total: "$total",
      },
    },
    { $sort: { total: -1 } },
  ]);
};

module.exports = {
  generateRandomUsers,
  computeAverageOfAgePerUserCountry,
};

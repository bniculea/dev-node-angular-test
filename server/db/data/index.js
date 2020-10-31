const faker = require("faker");

const generateRandomUsers = () => {
  const max = 50;
  const min = 12;
  const numberOfUsers = Math.floor(Math.random() * (max - min + 1) + min);
  const users = [];
  for (let i = 0; i < numberOfUsers; i++) {
    users.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      country: faker.address.country(),
    });
  }
  return users;
};

module.exports = {
  generateRandomUsers,
};

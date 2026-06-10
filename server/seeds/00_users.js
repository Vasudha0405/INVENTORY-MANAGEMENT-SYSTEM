const bcrypt = require("bcryptjs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").del();

  const hashedPassword = await bcrypt.hash("password123", 10);

  await knex("users").insert([
    {
      id: 1,
      name: "Admin Employee",
      email: "employee@instock.com",
      password: hashedPassword,
      role: "employee",
    },
    {
      id: 2,
      name: "Regular User",
      email: "user@instock.com",
      password: hashedPassword,
      role: "user",
    },
  ]);
};

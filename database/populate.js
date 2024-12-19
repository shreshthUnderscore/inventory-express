#! /usr/bin/env node

const { Client } = require("pg");

const SQL =
  // CREATE TABLE IF NOT EXISTS usernames (
  //   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  //   username VARCHAR ( 255 )
  // );
  `
INSERT INTO items (item_name, amount, price, image_url, category_id) 
VALUES ('Banana (6-Pieces)', 36, 44, '/images/dairy_bread.avif', 2),
('Bread', 50, 34, '/images/dairy_bread.avif', 1);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://shreshth:1234@localhost:5432/inventory",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();

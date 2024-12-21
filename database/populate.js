#! /usr/bin/env node

const { Client } = require("pg");

const SQL =
  // CREATE TABLE IF NOT EXISTS usernames (
  //   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  //   username VARCHAR ( 255 )
  // );
  // ('Meat & Seafoods', 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_294/NI_CATALOG/IMAGES/CIW/2024/4/22/e33d8321-cb8c-4732-9149-beb834eb24e4_8cee91b0-a380-43bb-90cf-9346a322ebeb'),
  //       ('Cold Drinks & Juices','https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_294/NI_CATALOG/IMAGES/CIW/2024/4/2/8344b7d1-c41a-4225-8b1d-8a2de011780a_0b366fdd-d4ab-467e-9349-c8ec57f65cda'),
  //       ('Atta, Rice & Dals','https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_294/NI_CATALOG/IMAGES/CIW/2024/4/2/90d94613-6a3f-4f86-b0ce-bff84443f18e_1934c92e-b882-463d-95f8-8a6b9a2aeb78'),
  //       ;

  `
  DROP TABLE IF EXISTS items;
  DROP TABLE IF EXISTS categories;

  CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    image_url TEXT
  );

  CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    amount INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
  );

  INSERT INTO categories (category_name, image_url) 
  VALUES
    ('Fresh Vegetables', 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_294/NI_CATALOG/IMAGES/CIW/2024/4/22/0a688af1-1bb4-4a55-8128-31fc79cc9ad0_6d0abb9a-daff-4fbe-a1c9-2dddb6ae6717'),
    ('Fresh Fruits', 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_294/NI_CATALOG/IMAGES/CIW/2024/4/22/85df9d8f-175f-4e3a-8945-468bf6317eee_eb9bf247-f2d1-413d-9cf5-48bc870b222f'),
    ('Dairy, Bread & Eggs', 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_294/NI_CATALOG/IMAGES/CIW/2024/4/2/4ee2d592-0ce2-47d0-beda-9457ac225890_aefc83a4-003b-4058-a9cb-21c9972c79ac'),
    ('Munchies', 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_294/NI_CATALOG/IMAGES/CIW/2024/4/2/2ead57e4-00b3-4525-91b2-9eb37a4be375_eee95c8a-e736-42ed-ab86-46add6ffe374');

  INSERT INTO items (item_name, amount, price, image_url, category_id)
  VALUES
    ('Tomato', 100, 60.00, 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/054e83b5ebe789cf4b7b146319df4cfc', 1),
    ('Carrots', 50, 26.00, 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/75b480795ee5cae74c461e02f05d7a10', 1),
    ('Onion', 200, 65.00, 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/765ff374dd4023fde2d3936ec482814d', 1),
    ('Potato', 200, 44.00, 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/0fd6f926feeab1b82e3579673277e01a', 1),
    ('Apple', 150, 80.00, 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/07643d37a633647698b1b36814522220', 2),
    ('Banana', 200, 50.00, 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/07643d37a633647698b1b36814522220', 2),
    ('Orange', 100, 120.00, 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/07643d37a633647698b1b36814522220', 2),
    ('Grapes', 180, 90.00, 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/64c203ac324a75504390ab67283b4793', 2),
    ('Milk', 100, 50.00, 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/otx1jdphqy1gvdlwsddr', 3),
    ('Bread', 80, 25.00, 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/NI_CATALOG/IMAGES/CIW/2024/11/18/8689979c-4fde-4aee-862b-4b3f95402e97_9334_1.png', 3),
    ('Eggs', 200, 5.00, 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/NI_CATALOG/IMAGES/CIW/2024/10/22/979cdd67-7a0f-4b35-8ae3-824be629c423_27252_1.png', 3),
    ('Butter', 50, 120.00, 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/emujgakbhef20bicfyn3', 3),
    ('Chips', 300, 20.00, 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/NI_CATALOG/IMAGES/CIW/2024/8/1/928e74af-ca07-48c3-8dc2-519dc1d8738c_5468_1.png', 4),
    ('Popcorn', 150, 40.00, 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/0975d3a63809f23acc85ad1fc4c3108d', 4),
    ('Bhelpuri', 200, 50.00, 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/0975d3a63809f23acc85ad1fc4c3108d', 4),
    ('Punjabi Tadka', 100, 30.00, 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_272,w_252/NI_CATALOG/IMAGES/CIW/2024/11/29/4048eb6a-c219-44fc-b4a5-590e558f5a7a_2223_1.png', 4);
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

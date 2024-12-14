const { Pool } = require("pg");

// Again, this should be read from an environment variable
module.exports = new Pool({
  connectionString: "postgresql://shreshth:1234@localhost:5432/inventory",
});

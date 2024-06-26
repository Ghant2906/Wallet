const connectContract = require("../connect/connectContract");
const connectDB = require("../connect/connectDB");

function eventListener() {
  const contract = connectContract();
  const client = connectDB();
  contract.on("AddressAdded", async (address) => {
    try {
      const addr = await client.query(
        "SELECT * FROM white_list WHERE address = ($1)",
        [address]
      );
      if (addr.rowCount == 0) {
        await client.query("INSERT INTO white_list (address) VALUES ($1)", [
          address,
        ]);
        console.log("Address saved to database:", address);
      }
    } catch (err) {
      console.error("Error saving to database", err);
    }
  });
  contract.on("AddressRemoved", async (address) => {
    try {
      await client.query("DELETE FROM white_list WHERE address = ($1)", [
        address,
      ]);
      console.log("Address removed to database:", address);
    } catch (err) {
      console.error("Error removed to database", err);
    }
  });
}

module.exports = eventListener;

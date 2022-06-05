const { default: mongoose } = require("mongoose");
const secrets = require("./secrets");

async function initiateMongoDB() {
  try {
    await mongoose.connect(secrets.MONGO_DB_CONNECTION_URI);
  } catch (error) {
    console.log("[Database Connection Error]", error);
  }
}

module.exports = initiateMongoDB;

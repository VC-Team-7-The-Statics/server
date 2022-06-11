const { default: mongoose } = require("mongoose");

const MatchSchema = new mongoose.Schema({
  couple: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
});

module.exports = mongoose.model("Match", MatchSchema);

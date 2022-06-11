const { default: mongoose } = require("mongoose");

const LaguageSchema = new mongoose.Schema({
  language: {
    type: String,
    required: [true, "언어의 이름을 적어 주세요."],
  },
  stack: [String],
});

module.exports = mongoose.model("Language", LaguageSchema);

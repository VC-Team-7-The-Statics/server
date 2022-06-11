const { default: mongoose } = require("mongoose");

const CoffeeFormSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "보내는 사람을 알 수 없습니다."],
    ref: "User",
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "받는 사람을 알 수 없습니다."],
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "제목을 입력해 주세요."],
  },
  content: {
    type: String,
    required: [true, "본문을 입력해 주세요."],
  },
  accepted: {
    type: Boolean,
    default: false,
  },
});

CoffeeFormSchema.set("timestamps", true);

module.exports = mongoose.model("CoffeeForm", CoffeeFormSchema);

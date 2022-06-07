const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "중복된 이름입니다."],
    required: [true, "이름을 입력해 주세요."],
  },
  email: {
    type: String,
    unique: [true, "중복된 이메일 주소 입니다."],
    required: [true, "이메일 주소를 입력해 주세요."],
  },
  password: {
    type: String,
    required: [true, "비밀번호를 입력해 주세요."],
    minlength: 3,
    select: false,
  },
  company: {
    type: String,
    required: [true, "회사를 입력해 주세요."],
  },
  image: {
    type: String,
    required: [true, "사진을 첨부해 주세요."],
  },
  language: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Laguage",
  },
  expertise: String,
  price: {
    type: Number,
    min: [5000, "최소 5000 원 이상만 가능합니다."],
    max: [100000, "최대 10 만 원 이상만 가능합니다."],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  liked: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  match: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  viewed: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  chatroom: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Chatroom",
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

UserSchema.set("timestamps", true);

module.exports = mongoose.model("User", UserSchema);

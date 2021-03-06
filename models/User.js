const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [1, "최소 6 자리 이상입니다."],
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
  languages: [
    {
      name: String,
      stacks: [String],
    },
  ],
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
  match: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Match",
  },
  chatroom: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "ChatRoom",
  },
  incomingCoffeeRequest: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "CoffeeForm",
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

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);

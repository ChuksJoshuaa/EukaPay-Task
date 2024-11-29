import { getEmailValidator, getPasswordValidators } from "@utils/validations";
import Mongoose from "mongoose";


const userSchema = new Mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
    maxLength: 50,
    minLength: 1,
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name"],
    maxLength: 50,
    minLength: 1,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: getEmailValidator(),
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [8, "Password must be at least 8 characters long"],
    validate: getPasswordValidators()
  },
}, { timestamps: true });

export default Mongoose.model("User", userSchema);
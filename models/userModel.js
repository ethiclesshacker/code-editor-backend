import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    contactNumber: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: false,
    },
    userDOB: {
      type: Date,
      required: false,
      default: Date.now
    },
    universityName: {
      type: String,
      required: true,
    },
    collegeName: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type:  String,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },


    // Internal Use Only
    roleId: {
      type: Number,
      required: true,
      default: 0,
    },

    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },

    modifiedAt: {
      type: Date,
      required: true,
      default: Date.now,
    }
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;

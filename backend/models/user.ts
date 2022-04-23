import mongoose, { Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface I_User {
  name: string;
  email: string;
  password: string;
  tokens: Array<any>;
  accessLevel: Number;
}

interface I_UserDocument extends I_User, mongoose.Document {
  toJSON: () => any;
  generateAuthToken: () => Promise<string>;
}

interface I_UserModel extends Model<I_UserDocument> {
  findByCredentials: (email: string, password: string) => Promise<I_UserDocument>;
  findByEmail: (email: string) => Promise<I_UserDocument>;
}

const userSchema: mongoose.Schema<I_UserDocument> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  accessLevel: {
    type: Number,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token: string = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

userSchema.statics.findByEmail = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User Not Found');
  }
  return user;
};

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model<I_UserDocument, I_UserModel>('User', userSchema);
export default User;

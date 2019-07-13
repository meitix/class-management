import { Schema, Model, model } from 'mongoose';
import { IUser } from '../interfaces/auth/user.interface';
import { genSalt, hash, compare } from 'bcryptjs';
import { pick } from 'lodash';

export const UserSchema = new Schema({
    username: {
        required: [true, 'نام کاربری یافت نشد'],
        type: String
    },
    userType: {
        type: String,
        required: true,
        default: 'user'
    },
    password: String,
    tokens: [String],
    info: {
        type: Schema.Types.ObjectId,
         ref: 'Person'
    }
});

  // generate auth token.
//   UserSchema.methods.generateAuthToken = function() {
//     const user = this;
//     const token = tokenManager.generate({
//       _id: user._id,
//       email: user.email,
//       remainingDays: user.remainingDays,
//       name: user.name,
//       mobile: user.mobile
//     });
//     user.tokens = user.tokens || []; // make empty array if there are no token.
//     user.tokens.push({ type: TokenType.auth, value: token });
//     return user.save().then(() => token);
//   };
  
  // get by credential method.
  UserSchema.statics.findByCredentials = function(credentials: any) {
    const User = this;
    return User.findOne({ email: credentials.email }).populate('info')
      .then(async (user: IUser) => {
        // reject the promise if the user does not found;
        if (!user) return Promise.reject('کاربری با این مشخصات یافت نشد.');
        // compare password with the hashed value.
        const passIsCorrect = await compare(credentials.password, user.password);
        // return the result if password is correct.
        if (passIsCorrect) return Promise.resolve(user);
        else return Promise.reject('خطا در ورود کاربر.');
      })
      .catch((err: any) => {
        return Promise.reject(err);
      });
  };
  
  // hash the new password before saving the user.
  UserSchema.pre("save", async function(next) {
    const user = <IUser>this;
    if (user.isModified("password")) {
      const salt = await genSalt(10);
      const hashedPass = await hash(user.password, salt);
      user.password = hashedPass;
    }
    next();
  });
  
  // handle duplicate email error.
  UserSchema.post("save", function(error, doc, next) {
    if (error.name === "MongoError" && error.code === 11000) {
      next(new Error('این کار بر قبل ثبت شده است'));
    } else {
      next(error);
    }
  });
  

export  const User: Model<IUser> = model('User', UserSchema);
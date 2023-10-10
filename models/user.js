import  mongoose from 'mongoose';

import  bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;

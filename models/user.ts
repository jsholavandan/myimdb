import * as mongoose from "mongoose";
import crypto = require('crypto');
import jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
  username:{type:String, unique:true, lowercase:true},
  email:{type:String, unique:true, lowercase:true},
  passwordHash: String,
  salt: String,
  role: String
});

UserSchema.method("setPassword", function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
});

UserSchema.method("validatePassword", function(password){
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
  return(hash === this.passwordHash);
});

UserSchema.method("generateJWT", function(){
  return jwt.sign({
    id: this._id,
    username:this.username,
    email:this.email
  }, process.env.SECRET_KEY);
});

export default mongoose.model('User', UserSchema);

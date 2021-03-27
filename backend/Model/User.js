var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var userSchema = new mongoose.Schema(
  {
    userName : {
      type : String,
      required : true
  },
  email : {
    type : String,
    required : true
  },
  role : {
    type : Number,
    required : true
  },
  salt : String,
  encry_password: {
    type: String,
    required: true
  },
  Description : {
    type : String
  },
  photo: {
    data: Buffer,
    contentType: String
  }

  
 
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  autheticate: function(plainpassword) {
    console.log("qqq",this.securePassword(plainpassword))
    console.log("encry",this.encry_password);
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function(plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      console.log(err)
      return "";
    }
  }
};

module.exports = mongoose.model("User", userSchema);

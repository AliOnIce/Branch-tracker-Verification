const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    branchNo: {type:String, trim:true},
    branchName: {type:String, require:true, trim:true, minlength:1}
});

const userSchema = new mongoose.Schema({
        username: {type: String, require: true, unique: true, trim: true, minlength: 3, maxLength:15},
        password: {type: String, require: true, minlength: 4, maxLength:255},
        usertype: {type: Number, require: true},
        nameSurname: {type: String, require: true, trim: true, minlength: 3, maxLength:30},
        regionName: {type: String, require: true, trim: true, minlength: 3, maxLength:25},
        branches: [branchSchema]
    },
    {timestamps: true}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
const mongoose = require('mongoose');

const salesByBranches = new mongoose.Schema({
    branchID: {type: mongoose.Schema.Types.ObjectId, require: true},
    branchNo: {type:String, trim:true},
    branchName: {type: String, require: true, trim: true},
    totalSale: {type: Number},
});

const dailySaleSchema = new mongoose.Schema({
        userID: {type: mongoose.Schema.Types.ObjectId, require: true},
        userName: {type:String, require: true},
        regionName: {type: String, require: true, trim: true, minlength: 3, maxLength:25},
        date: {type: Date, require: true},
        salesByBranches: [salesByBranches]
    },
    {timestamps: true}
);

const DailySale = mongoose.model('DailySale', dailySaleSchema);

module.exports = DailySale;
const mongoose = require('mongoose');
const DailySale = require('../models/dailySale.model');
const User = require('../models/user.model');

const getAllDailySaleInDate = (req, res) => {
    try {
        DailySale.find({date: req.params.date}).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).json({message: err.message});
        });
        ;
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

const getAllDailySaleInRange = (req, res) => {
    try {
        DailySale.find({date: {$gte: req.params.startDate, $lte: req.params.endDate}}).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).json({message: err.message});
        });
        ;
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

const getDailySaleByID = (req, res) => {
    try {
        const searchParams = {userID: new mongoose.Types.ObjectId(req.user._id), date: req.params.date};
        DailySale.findOne(searchParams).then(result => {
            if (result)
                return res.json(result);

            User.findOne({_id: searchParams.userID}).then(result => {

                const newSalesByBranches = result.branches.map(branch => {
                    return {
                        branchID: branch._id,
                        branchNo: branch.branchNo,
                        branchName: branch.branchName
                    }
                });


                const newDailySale = new DailySale({
                    userID: result._id,
                    regionName: result.regionName,
                    date: searchParams.date,
                    salesByBranches: newSalesByBranches
                });

                return res.json(newDailySale);
            });
        }).catch(err => {
            res.status(500).json({message: err.message});
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

const postCreateDailySale = (req, res) => {
    try {
        console.log(req.body);
        res.json("ok");
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

const updateDailySale = (req, res) => {
    try {
        DailySale.updateOne({
            _id: mongoose.Types.ObjectId(req.body._id),
            userID: mongoose.Types.ObjectId(req.user._id)
        }, req.body, {upsert: true}).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).json({message: err.message});
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
};


module.exports = {
    getAllDailySaleInDate,
    getAllDailySaleInRange,
    getDailySaleByID,
    postCreateDailySale,
    updateDailySale
};
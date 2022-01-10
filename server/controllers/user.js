const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const postLogin = (req, res) => {
    try {
        const {username, password} = req.body;
        if (!username || !password)
            return res.status(400).json({message: "Please fill all fields."});

        User.findOne({username: username, password: password})
            .then(exist => {
                if (!exist)
                    return res.status(401).json({message: "username or password incorrect"});

                let token = jwt.sign({
                    _id: exist._id,
                    username: exist.username,
                    usertype: exist.usertype,
                    nameSurname: exist.nameSurname,
                    regionName: exist.regionName,
                    branches: exist.branches,
                }, process.env.JWT_TOKEN);
                return res.status(200).json({token});
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

const postRegister = (req, res) => {
    try {
        const {username, password, nameSurname, regionName} = req.body;
        if (!username || !password || !nameSurname || !regionName)
            return res.status(404).json({message: "Eksik alanları doldurunuz"});

        User.findOne({username: username})
            .then(exist => {
                if (exist)
                    return res.status(400).json({message: username + " username already exist"});

                const user = new User({
                    username: username,
                    password: password,
                    usertype: 1,
                    nameSurname: nameSurname,
                    regionName: regionName
                });

                user.save()
                    .then(result => {
                        res.status(201).json(result);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({message: err.message});
                    });
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

const getUsers = (req, res) => {
    try {
        User.find({usertype: +process.env.DISTRICT_MANAGERTYPE}).then(users => {
            res.status(200).json(users);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

const putUpdateUser = (req, res) => {
    try {
        let id = req.params.id;
        if (!id)
            return res.status(404).json({message: "User id required!"});

        User.updateOne({_id: mongoose.Types.ObjectId(id)}, req.body).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).json({message: err.message});
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

const putUpdateUserAddBranch = (req, res) => {
    try {
        User.updateOne({_id: mongoose.Types.ObjectId(req.params.id)}, {$push: {branches: {$each: req.body}}}).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).json({message: err.message});
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

const deleteUser = (req, res) => {
    try {
        User.deleteOne({_id: mongoose.Types.ObjectId(req.params.id)}).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).json({message: err.message});
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
};

const deleteUserBranch = (req, res) => {
    try {
        let {userID, branchID} = req.params;

        User.updateOne({_id: mongoose.Types.ObjectId(userID)}, {$pull: {branches: {_id: mongoose.Types.ObjectId(branchID)}}}).then(result => {
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
    postLogin,
    postRegister,
    getUsers,
    putUpdateUser,
    putUpdateUserAddBranch,
    deleteUser,
    deleteUserBranch
};
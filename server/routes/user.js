const adminAuth = require("./middleware/adminAuth");
const {
    postLogin,
    postRegister,
    getUsers,
    putUpdateUser,
    putUpdateUserAddBranch,
    deleteUser,
    deleteUserBranch
} = require("../controllers/user");
const router = require('express').Router();

router.get('/getAll', adminAuth, getUsers);
router.post('/login', postLogin);
router.post('/register', adminAuth, postRegister);
router.put("/update/:id", adminAuth, putUpdateUser);
router.put("/update/:id/branch", adminAuth, putUpdateUserAddBranch);
router.delete("/:id", adminAuth, deleteUser);
router.delete("/:userID/:branchID", adminAuth, deleteUserBranch);


module.exports = router;
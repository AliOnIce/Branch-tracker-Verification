const managerAuth = require('./middleware/managerAuth');
const adminAuth = require("./middleware/adminAuth");
const {
    getAllDailySaleInDate,
    getAllDailySaleInRange,
    getDailySaleByID,
    postCreateDailySale,
    updateDailySale
} = require("../controllers/dailySale");
const router = require('express').Router();

router.get('/all/:date', adminAuth, getAllDailySaleInDate);
router.get('/all/:startDate/:endDate', adminAuth, getAllDailySaleInRange);
router.get('/:date', managerAuth, getDailySaleByID);
router.post('/', managerAuth, postCreateDailySale);
router.put('/', managerAuth, updateDailySale);



module.exports = router;
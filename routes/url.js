const express = require("express")
const {
        handleGenerateNewShortUrl,
        handleGetAnalytics,
        handleHomePage
       
} = require("../controllers/url")
const router  = express.Router()
router.get('/',handleHomePage)
router.post('/', handleGenerateNewShortUrl)

router.get('/analytics/:shortId',handleGetAnalytics)
module.exports= router;
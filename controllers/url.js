// const nanoid  = require("nanoid")
const shortid = require('shortid');
const URL = require("../model/url");
async function handleGenerateNewShortUrl(req, res){
    const body = req.body;
    if(!body.url)return res.status(400).json({error:"url is required"})
         
        // Dynamically import nanoid
    const { nanoid } = await import('nanoid');
    // const shortID = nanoid(8);
    const shortID = shortid.generate()
    if(!shortID) return res.status(500).json({error: "shortId is not generated"})
    console.log("shortID:",shortID)
    await URL.create(
        {
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        }
    )
    return res.render("home",
        {
            id:shortID
        }
    )
    // return res.json({id:shortID});
}

async function handleGetAnalytics(req, res) {
    
    const shortId = req.params.shortId;
    const result = await URL.findOne({
        shortId
    });
    if (!result) {
        return res.status(404).json({ message: "URL not found" });
    }
    res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

async function handleHomePage(req, res){
     res.json({home : "welecome"})
}

module.exports ={
    handleGenerateNewShortUrl,
    handleGetAnalytics,
    handleHomePage,
}

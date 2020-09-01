const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("harlo");
    // res.render("chat");
});

module.exports = router;
const router = require("express").Router();
const { Cat } = require("../model/cat.model");
// const checkToken = require("../config/config");
/* 
    @route GET api/items/:id
    @desc Gets one item
    @access public
*/
router.get("/:id", async(req, res) => {
    try {
        let cat = await Cat.findById(req.params.id);

        res.status(200).json({
            message: "cat found",
            cat,
        });
    } catch (err) {
        res.status(500).json({
            message: "fail",
            statuscode: "EB500",
        });
    }
});

/* 
    @route PUT api/items/:id
    @desc updates one item
    @access public
*/
router.put("/:id", async(req, res) => {
    try {
        let cat = await Cat.findByIdAndUpdate(req.params.id, req.body);

        if (cat) {
            res.status(200).json({
                message: "nothing spoil",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "ok already or not, maybe not work",
        });
    }
});
/* 
    @route DELETE api/items/:id
    @desc deletes one item
    @access public
*/
router.delete("/:id", async(req, res) => {
    try {
        let catDelete = await Cat.findByIdAndDelete(req.params.id);

        if (catDelete) {
            res.status(200).json({
                message: "sukses",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "fail",
            statuscode: "EB500",
        });
    }
});

router.post("/", async(req, res) => {
    console.log("HEEEERRERREEE");
    try {
        console.log(req.body);
        const { name, description, picture } = req.body;
        let cat = new Cat({ name, description, picture });

        let savedCat = await cat.save();

        res.status(201).json({
            message: "sukses",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "server error",
            statuscode: "EB500",
        });
    }
});
/* 
    @route GET api/items
    @desc Gets all items
    @access public
*/

//checkToken,

router.get("/", async(req, res) => {
    try {
        let cats = await Cat.find();

        res.status(200).send({
            count: cats.length,
            cats,
        });
    } catch (error) {
        res.status(500).json({
            message: "booo fail",
            statuscode: "EB500",
        });
    }
});

module.exports = router;
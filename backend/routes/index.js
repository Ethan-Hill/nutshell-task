var express = require("express")
var router = express.Router()
var fs = require("fs")
var path = require("path")

router.get("/recipes", (req, res) => {
  dir = path.join(__dirname, "../data/")
  const data = fs
    .readdirSync(dir)
    .filter((name) => path.extname(name) === ".json")
    .map((name) => require(path.join(dir, name)))

  res.send(data)
})

module.exports = router

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

router.get("/recipes/mains", (req, res) => {
  dir = path.join(__dirname, "../data/")
  const data = fs
    .readdirSync(dir)
    .filter((name) => path.extname(name) === ".json")
    .map((name) => require(path.join(dir, name)))

  const mains = data.filter((dish) => {
    return dish.tags.includes("main dish")
  })

  res.send(mains)
})

module.exports = router
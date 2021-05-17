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

router.get("/recipes/appetizers", (req, res) => {
  dir = path.join(__dirname, "../data/")
  const data = fs
    .readdirSync(dir)
    .filter((name) => path.extname(name) === ".json")
    .map((name) => require(path.join(dir, name)))

  const appetizers = data.filter((dish) => {
    return dish.tags.includes("appetizer")
  })

  res.send(appetizers)
})

router.get("/recipes/desserts", (req, res) => {
  dir = path.join(__dirname, "../data/")
  const data = fs
    .readdirSync(dir)
    .filter((name) => path.extname(name) === ".json")
    .map((name) => require(path.join(dir, name)))

  const desserts = data.filter((dish) => {
    return dish.tags.includes("dessert")
  })

  res.send(desserts)
})

module.exports = router

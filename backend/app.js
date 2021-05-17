var express = require("express")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
var cors = require("cors")

var indexRouter = require("./routes/index")

var app = express()

app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use("/api", indexRouter)

const listener = app.listen(process.env.PORT || 3000, () => {
  console.clear()
  console.log(`App listening on ${listener.address().port}`)
})

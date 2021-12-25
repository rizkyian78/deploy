require("dotenv").config()
const express = require("express")

const UserRoute = require("./Routes/User")

const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get("/", (req, res) => {
    res.send("")
})


app.use(UserRoute)

app.listen(port, () => console.log("Listening at port: " + port))
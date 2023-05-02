const express = require("express");
const app = express();
const pageRoute = require("./routes/pageRoute")

// template engine
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use("/", pageRoute)

const port = 3000
app.listen(port, () => {
    console.log(`Server is working on port ${port}`)
})
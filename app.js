const express = require('express');
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI
const users = require("./routes/api/users");
const lists = require("./routes/api/lists");
const tasks = require("./routes/api/tasks");
const bodyParser = require('body-parser');
// const User = require('./models/User');
const passport = require('passport')




mongoose
    .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(()=>console.log("Connected to mongoDB"))
    .catch(err => console.log(err));


// app.get("/", (req, res) => {
    // const user = new User({
    //     username: "William Leung",
    //     password: "123456"
    // })
    // user.save()
//     res.send("Hello Trustero");
// });

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(passport.initialize())
require('./config/passport')(passport)


app.use("/api/users", users);
app.use("/api/lists", lists);
app.use("/api/tasks", tasks);

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Listening on port ${port}`)})




//moving to heroku process 
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}
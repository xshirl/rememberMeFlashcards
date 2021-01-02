const express  = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const db = require('./db');
const app = express();
const PORT  = process.env.PORT || 3002;

app.use(bodyParser.urlencoded({extended:true}));

var corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"],
};
app.use(cors(corsOption));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', routes);
mongoose.set("useFindAndModify", false);

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
  res.send("hello world")
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

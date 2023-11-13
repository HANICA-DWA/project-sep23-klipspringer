const express = require('express')
const app = express()

const sessionParser = session({
    saveUninitialized: false,
    secret: "supergeheimecode",
    resave: false,
    name: "BKSsession",
});

app.use(sessionParser);
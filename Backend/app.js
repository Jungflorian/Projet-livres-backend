const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.json({
        message: 'le serveur est bien lancé',
    });
});

module.exports = app;
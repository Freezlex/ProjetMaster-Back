const express = require('express'),
    router = express.Router();

module.exports = class TestRoute{
    constructor(sequelize) {
        this.defaultPath = "/search";
        this.sequelize = sequelize;
    }

    init(){
        router
            .get('/', (req, res, next) => {
                res.send('TEST')
            })
        return router;
    }


}

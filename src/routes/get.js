const express = require('express'),
    router = express.Router();

module.exports = class CreateRoute{
    constructor(models) {
        this.defaultPath = '';
        this.models = models;
    }

    init(){
        router.get('/documents', async (req, res, next) => {
            res.json({error: null, res: await this.models.document.findAll({
                    include: [
                        {model: this.models.specialist, as: "specialist"}
                    ]
                })});
        })

        return router;
    }

}

const express = require('express'),
    router = express.Router();

const {Op} = require('sequelize');

module.exports = class SearchRoute{
    constructor(models) {
        this.defaultPath = '/search';
        this.models = models;
    }

    init(){
        router
            .post('', async(req, res,next) => {
                let searchString = await this.purifyString(req.body);
                let searchDate = await this.purifyDate(req.body);

                console.log(searchDate)

                let results = await this.models.document.findAll({
                    where: {
                        [Op.or]: {
                            sujet: {[Op.like]: `${await searchString.join(" ")}`},
                            auteur: {[Op.like]: `${await searchString.join(' ')}`},
                            type: {[Op.like]: `${await searchString.join(' ')}`},
                            date: { [Op.between]: [+searchDate['min'], +searchDate['max']]},
                            date_max: { [Op.between]: [+searchDate['min'], +searchDate['max']]}
                        }
                    }
                });
                return res.json({res: results, err: null});

        })
        return router;
    }

    async purifyString(body){
        if(!body.data)return null
        if(typeof body.data !== 'string')return null
        return body.data.split(" ").map(x => `%${x}%`);
    }

    async purifyDate(body){
        let min = body.date ? typeof body.date === "number" ? body.date : null : body['date-min'] ? typeof body['date-min'] === 'number' ? body['date-min'] : null : null ;
        let max = body['date-max'] ? typeof body['date-max'] === 'number' ? body['date-max'] : min : min;

        return {min: min, max: max}
    }

}

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


                if(!searchString && !searchDate['min'] && !searchDate['max'])return res.json({err: null, res: await this.models.document.findAll()});
                if(searchString)searchString = await searchString.join(" ");

                let results = await this.models.document.findAll({
                    where: {
                        [Op.or]: {
                            sujet: {[Op.like]: searchString},
                            auteur: {[Op.like]: searchString},
                            type: {[Op.like]: searchString},
                            date: { [Op.between]: [+searchDate['min'], +searchDate['max']]},
                            date_max: { [Op.between]: [+searchDate['min'], +searchDate['max']]}
                        }
                    }
                });
                return res.json({res: results, err: null});

        })

            .get('/advanced', async (req, res, next) => {
                let validate = await this.validateBody({
                    "auteur": "string",
                    "sujet": "string",
                    "type": "string",
                    "s_nom": "string",
                    "s_telephone": "string",
                    "s_email": "string",
                    "d_intitule": "string",
                    "l_intitule": "srting",
                    "l_ville": "string",
                    "l_code_postal": "number",
                    "l_adresse": "string",
                    "l_telephone": "string",
                    "l_email": "string"
                }, req.body)
                if(validate)return res.json({error: validate, res: null});
                let result = await this.models.document.findAll({
                    where: {
                        [Op.or]: {
                        auteur: {[Op.like]: req.body.auteur},
                        sujet: {[Op.like]:req.body.sujet},
                        type: {[Op.like]:req.body.type},
                    }},
                    include: [
                        {model: this.models.specialist, as: "d_specialiste",
                        where :{
                            [Op.or]: {
                            nom: {[Op.like]:req.body.s_nom},
                            telephone: {[Op.like]:"3247981476"},
                            email: {[Op.like]:req.body.s_email},
                        }}},
                        {model: this.models.discipline, as: "d_discipline",
                        where: {
                            [Op.or]: {
                                intitule: {[Op.like]:req.body.d_intitule}
                            }
                        }},
                        {model: this.models.localisation, as: "d_localisation",
                        where : {
                            [Op.or]: {
                                intitule: {[Op.like]:req.body.l_intitule},
                                ville: {[Op.like]:req.body.l_ville},
                                code_postal: {[Op.like]:req.body.l_code_postal},
                                adresse: {[Op.like]:req.body.l_adresse},
                                telephone: {[Op.like]:req.body.l_telephone},
                                email: {[Op.like]:req.body.l_email}
                            }
                        }}
                    ]
                })
                res.json({error: null, res: result});
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

    async validateBody(keys, body){
        let newKeys = Object.keys(keys);
        if(typeof newKeys !== "object")throw console.log(`Body checker require an object and not ${typeof body}`);
        for(let key of newKeys){
            console.log(body[key])
            if(body[key] === undefined)return `Missing ${key} key`;
            if(typeof body[key] === "object" && body[key] === null)return null
            if(body[key] !== null || typeof body[key] !== keys[key])return `Key format invalid for ${key}, require ${keys[key]} but obtained ${typeof body[key]}`;
        }

        return null
    }

}
SELECT `document`.`id`, `document`.`sujet`, `document`.`date`, `document`.`date_max`, `document`.`auteur`, `document`.`type`, `document`.`discipline_id`, `document`.`specialiste_id`, `document`.`localisation_id`, `d_specialiste`.`id` AS `d_specialiste.id`, `d_specialiste`.`nom` AS `d_specialiste.nom`, `d_specialiste`.`telephone` AS `d_specialiste.telephone`, `d_specialiste`.`email` AS `d_specialiste.email`, `d_specialiste`.`discipline_id` AS `d_specialiste.discipline_id`, `d_discipline`.`id` AS `d_discipline.id`, `d_discipline`.`intitule` AS `d_discipline.intitule`, `d_localisation`.`id` AS `d_localisation.id`, `d_localisation`.`intitule` AS `d_localisation.intitule`, `d_localisation`.`ville` AS `d_localisation.ville`, `d_localisation`.`code_postal` AS `d_localisation.code_postal`, `d_localisation`.`adresse` AS `d_localisation.adresse`, `d_localisation`.`telephone` AS `d_localisation.telephone`, `d_localisation`.`email` AS `d_localisation.email` FROM `documents` AS `document` INNER JOIN `specialists` AS `d_specialiste` ON `document`.`specialiste_id` = `d_specialiste`.`id` AND (`d_specialiste`.`nom` LIKE NULL OR `d_specialiste`.`telephone` LIKE '3247981476' OR `d_specialiste`.`email` LIKE NULL) INNER JOIN `disciplines` AS `d_discipline` ON `document`.`discipline_id` = `d_discipline`.`id` AND (`d_discipline`.`intitule` LIKE NULL) INNER JOIN `localisations` AS `d_localisation` ON `document`.`localisation_id` = `d_localisation`.`id` AND (`d_localisation`.`intitule` LIKE NULL OR `d_localisation`.`ville` LIKE NULL OR `d_localisation`.`code_postal` LIKE NULL OR `d_localisation`.`adresse` LIKE NULL OR `d_localisation`.`telephone` LIKE NULL OR `d_localisation`.`email` LIKE NULL) WHERE (`document`.`auteur` LIKE NULL OR `document`.`sujet` LIKE NULL OR `document`.`type` LIKE NULL);


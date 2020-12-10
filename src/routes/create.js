const express = require('express'),
    router = express.Router();

module.exports = class CreateRoute{
    constructor(models) {
        this.defaultPath = '';
        this.models = models;
    }

    init(){
        router
            .post('/discipline', async (req, res, next) => {
                let valid = await this.validateBody({
                    "intitule": "string",
                }, req.body);
                if(valid !== null)return res.json({res: null, err: valid})
                try{
                    let result = await this.models.discipline.create({
                        intitule: req.body.intitule
                    })
                    res.json({res: result, error: null})
                }catch (e){
                    return res.json({res : null, error: e})
                }
            })
            .post('/document', async (req, res, next) => {
                req.body.date = req.body.date ?  req.body.date : req.body['date-min'];
                let valid = await this.validateBody({
                    "sujet": "string",
                    "date": "number",
                    "auteur": "string",
                    "type": "string",
                    "discipline_id": "number",
                    "specialiste_id": "number",
                    "localisation_id": "number"
                }, req.body);
                if(valid !== null)return res.json({res: null, err: valid})
                try{
                    let result = await this.models.document.create({
                        sujet: req.body.sujet,
                        date: req.body.date,
                        date_max: req.body['date-max'] ? typeof req.body['date-max'] === 'number' ? req.body['date-max'] : null : null ,
                        auteur: req.body.auteur,
                        type: req.body.type,
                        discipline_id: req.body['discipline_id'],
                        specialiste_id: req.body['specialiste_id'],
                        localisation_id: req.body['localisation_id']})
                    res.json({res: result, error: null})
                }catch (e){
                    return res.json({res : null, error: e})
                }
            })
            .post('/specialiste', async (req, res, next) => {
                let valid = await this.validateBody({
                    "nom": "string",
                    "telephone": "string",
                    "email": "string",
                    "discipline_id": "number"
                }, req.body)
                if(valid !== null)return res.json({res: null, err: valid})
                try{
                    let result = await this.models.specialist.create({
                        nom: req.body.nom,
                        telephone: req.body.telephone,
                        email: req.body.email,
                        discipline_id: req.body['discipline_id']
                    })
                    res.json({res: result, error: null})
                }catch (e){
                    return res.json({res : null, error: e})
                }
            })
            .post('/localisation', async (req, res, next) => {
                let valid = await this.validateBody({
                    "intitule": "string",
                    "ville": "string",
                    "code_postal": "number",
                    "adresse": "string",
                    "telephone": "string",
                    "email": "string"
                }, req.body)
                if(valid !== null)return res.json({res: null, err: valid})
                try{
                    let result = await this.models.localisation.create({
                        intitule: req.body.intitule,
                        ville: req.body.ville,
                        code_postal: req.body.code_postal,
                        adresse: req.body.adresse,
                        telephone: await parseInt(req.body.telephone, 10),
                        email: req.body.email
                    })
                    res.json({res: result, error: null})
                }catch (e){
                    return res.json({res : null, error: e})
                }
            })
        return router;
    }

    async validateBody(keys, body){
        let newKeys = Object.keys(keys);
        if(typeof newKeys !== "object")throw console.log(`Body checker require an object and not ${typeof body}`);
        for(let key of newKeys){
            if(!body[key])return `Missing ${key} key`;
            if(typeof body[key] !== keys[key])return `Key format invalid for ${key}, require ${keys[key]} but obtained ${typeof body[key]}`;
        }

        return null
    }

}

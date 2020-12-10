const express = require('express'),
    router = express.Router();

module.exports = class CreateRoute{
    constructor(models) {
        this.defaultPath = '';
        this.models = models;
    }

    init(){
        router.get('/document', async (req, res, next) => {
            if(!req.query.id)return res.json({error: "No ID provided. Pleased provide an ID", res: null});
            if(typeof req.query.id !== "string")return res.json({error: `Error typeof ID. Required string, obtain ${typeof req.query.id}`})
            else req.query.id = parseInt(req.query.id, 10);
            res.json({error: null, res: await this.models.document.findOne({
                    where: {
                        id: req.query.id
                    },
                    include: [
                        {model: this.models.specialist, as: "d_specialiste"},
                        {model: this.models.discipline, as: "d_discipline"},
                        {model: this.models.localisation, as: "d_localisation"}
                    ]
                })});
        })
            .get('/documents', async (req, res, next) => {
                res.json({error: null, res: await this.models.document.findAll()});
            })
            .get('/specialist', async (req, res ,next)=> {
                if(!req.query.id)return res.json({error: "No ID provided. Pleased provide an ID", res: null});
                if(typeof req.query.id !== "string")return res.json({error: `Error typeof ID. Required string, obtain ${typeof req.query.id}`})
                else req.query.id = parseInt(req.query.id, 10);
                res.json({error: null, res: await this.models.specialist.findOne({
                        where: {
                            id: req.query.id
                        },
                        include: [
                            {model: this.models.discipline, as: "s_discipline"}
                        ]
                    })});
            })
            .get('/specialists', async (req, res, next) => {
                res.json({error: null, res: await this.models.specialist.findAll()});
            })
            .get('/localisation', async (req, res ,next)=> {
                if(!req.query.id)return res.json({error: "No ID provided. Pleased provide an ID", res: null});
                if(typeof req.query.id !== "string")return res.json({error: `Error typeof ID. Required string, obtain ${typeof req.query.id}`})
                else req.query.id = parseInt(req.query.id, 10);
                res.json({error: null, res: await this.models.localisation.findOne({
                        where: {
                            id: req.query.id
                        }
                    })});
            })
            .get('/localisations', async (req, res, next) => {
                res.json({error: null, res: await this.models.localisation.findAll()});
            })
            .get('/discipline', async (req, res ,next)=> {
                if(!req.query.id)return res.json({error: "No ID provided. Pleased provide an ID", res: null});
                if(typeof req.query.id !== "string")return res.json({error: `Error typeof ID. Required string, obtain ${typeof req.query.id}`})
                else req.query.id = parseInt(req.query.id, 10);
                res.json({error: null, res: await this.models.discipline.findOne({
                        where: {
                            id: req.query.id
                        }
                    })});
            })
            .get('/disciplines',async (req, res, next) => {
                res.json({error: null, res: await this.models.discipline.findAll()});
            })

        return router;
    }

}

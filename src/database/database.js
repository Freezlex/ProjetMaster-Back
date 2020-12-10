const { Sequelize } = require('sequelize');
const relations = require('./relations');
require('dotenv').config();

module.exports = class Database {
    async init(modelsPath){
        let sequelize = await new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USER, process.env.SQL_PSW, {
            host: process.env.SQL_HOST,
            port: process.env.SQL_PORT,
            dialect: 'mysql',
            define: {
                timestamps: false
            },
        });

        let models = require('require-all')({
            dirname: modelsPath
        });

        for(const model of Object.values(models)){
            console.log(`Initializing new model`)
            model.init({}, sequelize);
        }

        sequelize = await new relations().init(sequelize)

        console.log(`Ending database init`);
        /* TODO : Remove force setting, is only for test it will erase all tables before create them again*/
        await sequelize.sync();
        return sequelize;
    }
}

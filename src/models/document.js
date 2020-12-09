const Sequelize = require('sequelize');

module.exports = class document extends Sequelize.Model{
    static init(attribute, sequelize){
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            sujet: {
                type: Sequelize.STRING,
                allowNull: false
            },
            date: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            date_max: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            auteur: {
                type: Sequelize.STRING,
                allowNull: false
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            discipline_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            localisation_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        }, {
            sequelize
        });
    }
}

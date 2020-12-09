const Sequelize = require('sequelize');

module.exports = class localisation extends Sequelize.Model{
    static init(attribute, sequelize){
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            intitule: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            ville :{
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            code_postal: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            adresse: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            telephone: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: false
            }
        }, {
            sequelize
        });
    }
}

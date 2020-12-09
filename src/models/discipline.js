const Sequelize = require('sequelize');

module.exports = class discipline extends Sequelize.Model{
    static init(attribute, sequelize){
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            intitule:{
                type: Sequelize.STRING,
                allowNull: false
            }
        }, {
            sequelize
        });
    }
}

const Sequelize = require('sequelize');

module.exports = class specialist extends Sequelize.Model{
    static init(attribute, sequelize){
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            nom :{
                type: Sequelize.STRING,
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

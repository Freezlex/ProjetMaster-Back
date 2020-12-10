module.exports = class relations {
    async init(Sequelize){
        /* Relation discipline 1-n documents */
        Sequelize.models.discipline.hasMany(Sequelize.models.document, {foreignKey: "discipline_id", as: "d_discipline"});
        Sequelize.models.document.belongsTo(Sequelize.models.discipline, {foreignKey: "discipline_id", as: "d_discipline"})

        /* Relation specialist 1-n document */
        Sequelize.models.specialist.hasMany(Sequelize.models.document, {foreignKey: "specialiste_id", as: "d_specialiste"});
        Sequelize.models.document.belongsTo(Sequelize.models.specialist, {foreignKey: "specialiste_id", as: "d_specialiste"});

        /* Relation localisation 1-n document */
        Sequelize.models.localisation.hasMany(Sequelize.models.document, {foreignKey: "localisation_id", as: "d_localisation"});
        Sequelize.models.document.belongsTo(Sequelize.models.localisation, {foreignKey: "localisation_id", as: "d_localisation"})

        /* Relation discipline 1-n specialist */
        Sequelize.models.discipline.hasMany(Sequelize.models.specialist, {foreignKey: "discipline_id", as: "s_discipline"});
        Sequelize.models.specialist.belongsTo(Sequelize.models.discipline, {foreignKey: "discipline_id", as: "s_discipline"});



        return Sequelize;
    }
}

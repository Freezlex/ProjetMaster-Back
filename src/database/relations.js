module.exports = class relations {
    async init(Sequelize){
        /* Relation discipline 1-n documents */
        Sequelize.models.discipline.hasMany(Sequelize.models.document, {foreignKey: "discipline_id"});

        /* Relation specialist 1-n document */
        Sequelize.models.specialist.hasMany(Sequelize.models.document, {foreignKey: "specialiste_id", as: "Specialiste"});
        Sequelize.models.document.belongsTo(Sequelize.models.specialist);

        /* Relation localisation 1-n document */
        Sequelize.models.localisation.hasMany(Sequelize.models.document, {foreignKey: "localisation_id"});

        /* Relation discipline 1-n specialist */
        Sequelize.models.discipline.hasMany(Sequelize.models.specialist, {foreignKey: "discipline_id"});



        return Sequelize;
    }
}

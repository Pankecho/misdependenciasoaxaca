const database = require("./db")
	.database;
const Sequelize = require("./db")
	.Sequelize;

const Tramite= database.define("tramite", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		field: "id"
	},
    nombre:{type:Sequelize.STRING,
            field:"nombre"},
    descripcion:{type:Sequelize.STRING,
            field:"descripcion"},
    requisitos:{type:Sequelize.STRING,
            field:"requisitos"}
}, {
	timestamps: false,
	freezeTableName: false,
	tableName: "tramite"
});

module.exports = Tramite;
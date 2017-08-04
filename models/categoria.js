const database = require("./db")
	.database;
const Sequelize = require("./db")
	.Sequelize;

const Categoria= database.define("categoria", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		field: "id"
	},
    nombre:{type:Sequelize.STRING,
            field:"nombre"}
}, {
	timestamps: false,
	freezeTableName: false,
	tableName: "categoria"
});

module.exports = Categoria;
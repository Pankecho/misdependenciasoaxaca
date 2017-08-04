const database = require("./db")
	.database;
const Sequelize = require("./db")
	.Sequelize;

const Comentario= database.define("comentario", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		field: "id"
	},
    descripcion:{type:Sequelize.STRING,
            field:"descripcion"},
    fecha:{type:Sequelize.DATEONLY,
            field:"fecha"}
}, {
	timestamps: false,
	freezeTableName: false,
	tableName: "comentario"
});

module.exports = Comentario;
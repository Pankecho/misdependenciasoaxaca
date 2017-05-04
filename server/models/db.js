var Sequelize = require("sequelize");

<<<<<<< HEAD
database = new Sequelize("dependencias", "postgres", "Jpmr01495", {
=======
database = new Sequelize("dependencias", "postgres", "kiraaeedu", {
>>>>>>> 01ea424b648a2ef8b55925a7d9db437eb12601a1
	host: "localhost",
	dialect: "postgres",
	pool: {
		max: 10,
		min: 0,
		idle: 10000
	},
	logging: false
		//	omitNull: true
});


database
	.authenticate()
	.then(function (err) {
		console.log('Connection has been established successfully.');
	})
	.catch(function (err) {
		console.log('Unable to connect to the database:', err);
	});

module.exports = {
	database: database,
	Sequelize: Sequelize
}

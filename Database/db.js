const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("equity_data", "root", "MysqlTouseef", {
  host: "localhost",
  dialect: "mysql",
  /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

const db = {
  dbconnect: async (req, res) => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  },
  dbdisconnect: async (req, res) => {
    try {
      await sequelize.close();
      console.log("Connection has been closed successfully.");
    } catch (error) {
      console.log("Unable to close the sequelize connection.");
    }
  },
  query: async(query) => {
    try {
        const outcome = await sequelize.query(query);
        return outcome;
    } catch (error) {
        console.log("Unable to perform the given query!")
        console.log(error);
    }
  }
};

module.exports = db;

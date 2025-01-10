const { Sequelize } = require('sequelize');

// Get database configuration from environment variables
const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  NODE_ENV,
  DATABASE_URL
} = process.env;

// Create Sequelize instance
const sequelize = NODE_ENV === 'production' 
  ? new Sequelize(DATABASE_URL, {
      dialect: 'postgres',
      ssl: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    })
  : new Sequelize({
      database: DB_NAME,
      username: DB_USER,
      password: DB_PASSWORD,
      host: DB_HOST,
      port: DB_PORT,
      dialect: 'postgres',
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    });

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');

    // Sync database in development
    if (NODE_ENV === 'development') {
      await sequelize.sync();
      console.log('Database synced');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

// Handle connection events
sequelize.afterConnect(() => {
  console.log('Connection pool established');
});

sequelize.afterDisconnect(() => {
  console.log('Connection pool closed');
});

process.on('SIGINT', async () => {
  try {
    await sequelize.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error closing database connection:', error);
    process.exit(1);
  }
});

module.exports = { sequelize, connectDB }; 
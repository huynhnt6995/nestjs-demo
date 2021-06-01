module.exports = {
    "type": "postgres",
    "host": "nestjs-demo-postgres",
    "port": 5432,
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DB,
    "synchronize": true,
    "logging": process.env.LOG_DATABASE == 'true',
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "cli": {
        "migrationsDir": "src/migration"
    }
}
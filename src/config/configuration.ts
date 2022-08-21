export default () => ({
  node_env: process.env.NODE_ENV || "local",
  port: parseInt(process.env.PORT, 10) || 3000,
  log_file_path: process.env.LOG_FILE_PATH || "logs/combined.log",
  database: {
    type: process.env.DATABASE_TYPE || "postgres",
    host: process.env.DATABASE_HOST || "localhost11",
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER || "example_user",
    password: process.env.DATABASE_PASSWORD || "example_pass",
    db_name: process.env.DATABASE_NAME || "example_pass",
  },
});

import { Logger, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DeviceController } from "./device/device.controller";
import { DeviceService } from "./device/device.service";
import { DeviceModule } from "./device/device.module";
import configuration from "./config/configuration";
import { Device } from "./entities/device.entity";

const customWinstonFormatter = winston.format.printf((info) => {
  if (info.level === "error" && info.error) {
    // ${info.error.stack} == error.name: error.message \n error.stack
    return `[${info.timestamp}] [${info.context}] [${info.level}] ${
      info.error.stack
    }\n${JSON.stringify(info.error, null, 4)}`;
  }
  return `[${info.timestamp}] [${info.context}] [${info.level}] ${info.message}`;
});
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "env/.env",
      load: [configuration],
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss Z" }),
              customWinstonFormatter,
              // winston.format.errors({ stack: true }),
              // winston.format.printf(({ context, level, message, timestamp }) => {
              //   return `[${timestamp}] [${context}] [${level}] ${message}`;
              // })
              // winston.format.prettyPrint(), // not good for production env
              // nestWinstonModuleUtilities.format.nestLike(),
            ),
            level:
              configService.get<string>("node_env") === "prod"
                ? "info"
                : "silly",
          }),
          new winston.transports.File({
            format: winston.format.combine(
              winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss Z" }),
              customWinstonFormatter,
              // winston.format.errors({ stack: true }),
              // winston.format.prettyPrint()
              // winston.format.printf(({ context, level, message, timestamp }) => {
              //   return `[${timestamp}] [${context}] [${level}] ${message}`;
              // })
            ),
            filename: configService.get<string>("log_file_path"),
            level:
              configService.get<string>("node_env") === "production"
                ? "info"
                : "silly",
          }),
        ],
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("database.host"),
        port: configService.get<number>("database.port"),
        username: configService.get<string>("database.username"),
        password: configService.get<string>("database.password"),
        database: configService.get<string>("database.db_name"),
        synchronize: true,
        migrationsRun: true,
        autoLoadEntities: true,
        logging: ["warn", "error"],
        logger: process.env.NODE_ENV === "prod" ? "file" : "debug",
        migrations: [join(__dirname, "migrations/*{.ts,.js}")],
        cli: {
          migrationsDir: "src/migrations",
        },
        // entities: ["../**/*.entity{ .ts,.js}"],
        entities: [Device],
      }),
    }),
    DeviceModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger, DeviceService],
})
export class AppModule {}

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class device1661068268789 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "device",
        columns: [
          {
            name: "Id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "deviceId",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "deviceType",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "deviceName",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "groupId",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "temperature",
            type: "int",
            isNullable: true,
            default: 0,
          },
          {
            name: "humidity",
            type: "int",
            isNullable: true,
          },
          {
            name: "occupancy",
            type: "boolean",
            isNullable: true,
            default: false,
          },
          {
            name: "CreatedAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "UpdatedAt",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

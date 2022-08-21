import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Device } from "src/entities/device.entity";
import { DeviceController } from "./device.controller";
import { DeviceService } from "./device.service";

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  controllers: [DeviceController],
  providers: [DeviceService, Logger],
  exports: [TypeOrmModule],
})
export class DeviceModule {}

import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Device } from "src/entities/device.entity";
import { Repository } from "typeorm";
import { DeviceDto } from "./device.dto";

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {}
  async create(json: DeviceDto) {
    try {
      const insert = {
        deviceId: json.deviceId,
        deviceType: json.deviceType,
        deviceName: json.deviceName,
        groupId: json.groupId,
        temperature: json.data.temperature,
        humidity: json.data.humidity,
        occupancy: json.data.occupancy,
      };
      const data = await this.deviceRepository.insert(insert);
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

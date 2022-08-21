import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Post,
} from "@nestjs/common";
import { DeviceDto } from "./device.dto";
import { DeviceService } from "./device.service";

@Controller("device")
export class DeviceController {
  constructor(
    private readonly deviceService: DeviceService,
    private logger: Logger,
  ) {}
  @Get()
  hello() {
    return "hello";
  }
  @Post("/create")
  async create(@Body() body: DeviceDto) {
    try {
      const data = await this.deviceService.create(body);
      return "success";
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }
}

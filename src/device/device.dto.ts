import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class DeviceDto {
  @IsNotEmpty()
  @Type(() => String)
  deviceId: string;
  @IsNotEmpty()
  @Type(() => String)
  deviceType: string;
  @IsNotEmpty()
  @Type(() => String)
  deviceName: string;
  @IsNotEmpty()
  @Type(() => String)
  groupId: string;
  dataType: string;
  data: {
    version: number;
    messageType: string;
    occupancy: boolean;
    stateChanged: number;
    fullPowerMode: boolean;
    activePowerControl: boolean;
    firmwareVersion: number;
    temperature: number;
    humidity: number;
  };
}

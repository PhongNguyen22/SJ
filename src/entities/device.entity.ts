import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

@Entity()
export class Device {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Index()
  @Column()
  deviceId: string;

  @Column()
  deviceType: string;

  @Column()
  deviceName: string;

  @Column()
  groupId: string;

  @Column({ nullable: true })
  temperature: number;

  @Column({ nullable: true })
  humidity: number;

  @Column({ nullable: true, default: false })
  occupancy: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

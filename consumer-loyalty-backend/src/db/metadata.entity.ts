import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class MetadataEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: snakeCase('createdAt'),
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: snakeCase('updatedAt'),
    type: 'timestamp',
    nullable: true,
  })
  updatedAt: Date | null;
}

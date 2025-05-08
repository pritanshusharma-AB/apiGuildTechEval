import { Column, PrimaryColumn } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class Metadata {
  @PrimaryColumn('uuid')
  id: string;

  @Column('timestamp', { name: snakeCase('createdAt') })
  createdAt: Date;

  @Column('timestamp', { name: snakeCase('updatedAt'), nullable: true })
  updatedAt: Date | null;
}

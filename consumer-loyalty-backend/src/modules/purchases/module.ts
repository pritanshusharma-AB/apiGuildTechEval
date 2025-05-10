import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseEntity } from 'src/modules/purchases/entity';
import { PurchaseService } from './service';
import { PurchaseResolver } from './resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseEntity])],
  providers: [PurchaseService, PurchaseResolver],
  exports: [PurchaseService],
})
export class PurchaseModule {}

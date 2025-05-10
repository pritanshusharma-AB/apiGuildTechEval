import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from 'src/db/entities/purchases';
import { PurchaseService } from './service';
import { PurchaseResolver } from './resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase])],
  providers: [PurchaseService, PurchaseResolver],
  exports: [PurchaseService],
})
export class PurchaseModule {}

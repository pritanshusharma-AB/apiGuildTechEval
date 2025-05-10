import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entity';
import { CustomerResolver } from './resolver';
import { CustomerService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  providers: [CustomerService, CustomerResolver],
  exports: [CustomerService],
})
export class CustomerModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseEntity } from './entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(PurchaseEntity)
    private purchaseRepository: Repository<PurchaseEntity>,
  ) {}

  async findAll(): Promise<PurchaseEntity[]> {
    return this.purchaseRepository.find({ order: { createdAt: 'DESC' } });
  }
}

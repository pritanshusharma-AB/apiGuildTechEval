import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from '../../db/entities/purchases';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
  ) {}

  async findAll(): Promise<Purchase[]> {
    return this.purchaseRepository.find({ order: { createdAt: 'DESC' } });
  }
}

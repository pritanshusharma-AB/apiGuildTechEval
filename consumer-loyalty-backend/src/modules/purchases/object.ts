import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
class MetadataObject {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}

@ObjectType()
export class PurchaseObject extends MetadataObject {
  @Field(() => Number)
  quantity: number;

  @Field(() => Number)
  salePrice: number;

  @Field(() => Number)
  totalPrice: number;

  @Field(() => Number)
  awardRate: number;

  @Field(() => Number)
  pointsEarned: number;

  @Field(() => ID)
  customerId: string;

  @Field(() => ID)
  productId: string;

  @Field(() => ID)
  retailerId: string;

  @Field(() => ID, { nullable: true })
  promotionId?: string | null;
}

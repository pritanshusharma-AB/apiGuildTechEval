import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MetadataObject } from 'src/common/metadata.object';

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

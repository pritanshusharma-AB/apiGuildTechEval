import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MetadataObject {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;
}

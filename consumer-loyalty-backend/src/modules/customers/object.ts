import { Field, ObjectType } from '@nestjs/graphql';
import { MetadataObject } from 'src/common/metadata.object';

@ObjectType()
export class CustomerObject extends MetadataObject {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => Number)
  pointBalance: number;
}

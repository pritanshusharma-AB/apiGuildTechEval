import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/dataSource';
import { PurchaseModule } from './modules/purchases/module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // Enable code-first schema generation
      playground: false, // Enable playground for development
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    PurchaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

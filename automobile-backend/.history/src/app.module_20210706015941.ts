import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AutomobileModule } from './automobile/automobile.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    AutomobileModule, 
    DatabaseModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'che'
    })],
  controllers: [],
  providers: [],
})
export class AppModule {} 
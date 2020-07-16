import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MessagesModule } from './modules/messages/messages.module';
import { join } from 'path';
import { TweetsModule } from './modules/tweets/tweets.module';
@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: true,
      resolverValidationOptions: {
        requireResolversForResolveType: false
      },
      definitions: {
        path: join(process.cwd(), 'libs/models/graphql.ts'),
        outputAs: 'class'
      }
    }), 
    MessagesModule,
    TweetsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

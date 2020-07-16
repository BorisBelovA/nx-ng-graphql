import { Module } from '@nestjs/common';
import { TweetsResolver } from './tweets.resolver';

@Module({
    providers: [TweetsResolver],
    exports: [TweetsResolver]
})
export class TweetsModule {
}
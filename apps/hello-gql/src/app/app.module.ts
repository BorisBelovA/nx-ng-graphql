import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TweetsService } from '../services/tweets/tweets-service.service';
import { TwitterFeedModule } from '@components/twitter-feed/twitter-feed.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    GraphQLModule,
    BrowserAnimationsModule,
    TwitterFeedModule
  ],
  providers: [
    TweetsService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

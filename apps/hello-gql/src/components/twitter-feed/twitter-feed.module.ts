import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwitterFeedComponent } from './twitter-feed.component';
import { TweetModule } from '@components/tweet/tweet.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TweetsService } from '../../services/tweets/tweets-service.service';
@NgModule({
  declarations: [TwitterFeedComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    TweetModule,
    MatButtonModule,
    MatInputModule,
  ],
  providers: [TweetsService],
  exports: [TwitterFeedComponent]
})
export class TwitterFeedModule { }

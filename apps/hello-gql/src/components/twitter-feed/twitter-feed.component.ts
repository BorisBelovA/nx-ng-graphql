import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { Tweet } from 'libs/models/graphql';
import { TweetsService } from '../../services/tweets/tweets-service.service';

@Component({
  selector: 'twitter-feed',
  templateUrl: './twitter-feed.component.html',
  styleUrls: ['./twitter-feed.component.scss']
})
export class TwitterFeedComponent implements OnInit {

  constructor(
    private tweetsSetvice: TweetsService
  ) { }

  @Input()
  public feed: Tweet[]

  @Output()
  public newTweet = new EventEmitter<string>();

  public newTweetFormVisible = false;

  public tweetText: string;

  ngOnInit(): void {
  }

  onChange($event){
    console.log($event)
  }

  public openNewTweetForm(): void {
    this.newTweetFormVisible = true;
  }

  public makeTweet(): void {
    this.newTweetFormVisible = false;
    this.newTweet.emit(this.tweetText);
  }

  public onTweetFavorite(event: {tweet: Tweet, favorite: boolean}): void {
    console.log(event)
    this.tweetsSetvice.updateTweetFavoriteState(event.tweet.id, event.favorite);
  }
}
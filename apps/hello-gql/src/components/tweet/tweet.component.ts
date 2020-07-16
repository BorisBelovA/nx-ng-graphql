import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tweet } from 'libs/models/graphql';

@Component({
  selector: 'tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  @Input()
  public tweet: Tweet;

  @Output()
  public favoriteTweet = new EventEmitter<{tweet: Tweet, favorite: boolean}>();
  
  constructor() { }

  ngOnInit(): void {
  }

  public onLikeHandler(tweet: Tweet): void {
    this.favoriteTweet.emit({tweet, favorite: !tweet.favorite });
  }
}

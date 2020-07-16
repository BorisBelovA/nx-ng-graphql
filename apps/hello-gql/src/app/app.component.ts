import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@angular-gql/api-interfaces';
import { TweetsService } from '../services/tweets/tweets-service.service';

@Component({
  selector: 'angular-gql-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(
    private http: HttpClient,
    private tweetsSetvice: TweetsService
  ) {
    this.tweetsSetvice.getTweets().subscribe(d => console.log(d))
  }

  public feed$ = this.tweetsSetvice.getTweets();

  public onNewTweet(text: string) {
    this.tweetsSetvice.addTweet(text)
  }

}

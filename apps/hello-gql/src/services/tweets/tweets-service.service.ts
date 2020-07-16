import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { Tweet } from 'libs/models/graphql';

export interface GQLResponseDTO<T> {
  data: {
    [x: string]: Array<T>
  };
  loading: boolean;
  networkStatus: number;
  stale: boolean;  
}

const getTweetsQuery = gql`{ 
  tweets{
    id,
    authorId,
    likes,
    retweets,
    text,
    favorite
  }
}`;

const addTweetMutation = gql`
  mutation newTweet($authorId: Int!, $text: String!) {
    newTweet(
      authorId: $authorId,
      text: $text
    ) {
      id, 
      authorId,
      likes,
      retweets,
      text,
      favorite
    }
  }
`;

const updateTweetFavoriteState = gql`
  mutation updateTweetFavoriteState($tweetId: Int!, $state: Boolean!) {
    updateTweetFavoriteState(
      tweetId: $tweetId,
      state: $state
    ) {
      id,
      text,
      favorite
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  constructor(
    private apollo: Apollo
  ) { }

  public getTweets(): Observable<Array<any>> {
    return this.apollo.watchQuery({
      query: getTweetsQuery
    }).valueChanges.pipe(
      map((response: GQLResponseDTO<Tweet[]>) => response.data.tweets)
    )
  }

  public addTweet(text: string) {
    return this.apollo.mutate({
      mutation: addTweetMutation,
      variables: {
        authorId: 1,
        text: text
      },
      refetchQueries: [{
        query: getTweetsQuery
      }]
    }).subscribe()
  }

  public updateTweetFavoriteState(tweetId: number, state: boolean) {
    return this.apollo.mutate({
      mutation: updateTweetFavoriteState,
      variables: {
        tweetId: tweetId,
        state: state
      },
      refetchQueries: [{
        query: getTweetsQuery
      }]
    }).subscribe(d => console.log(d))
  }
}

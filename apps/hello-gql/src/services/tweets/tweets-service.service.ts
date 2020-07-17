import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { Tweet } from 'libs/models/graphql';

const TweetBodyFragment = gql`
  fragment TweetBody on Tweet {
    id,
    authorId,
    likes,
    retweets,
    text,
    favorite
  }
`

export interface GQLResponseDTO<T> {
  data: {
    [x: string]: Array<T>
  };
  loading: boolean;
  networkStatus: number;
  stale: boolean;  
}

const getTweetsQuery = gql` 
  query tweets($offset: Int) {
    tweets(
      offset: $offset
    ){
      ...TweetBody
    }
  }
  ${TweetBodyFragment}
`;

const addTweetMutation = gql`
  mutation newTweet($authorId: Int!, $text: String!) {
    newTweet(
      authorId: $authorId,
      text: $text
    ) {
      ...TweetBody
    }
  }
  ${TweetBodyFragment}
`;

const updateTweetFavoriteState = gql`
  mutation updateTweetFavoriteState($tweetId: Int!, $state: Boolean!) {
    updateTweetFavoriteState(
      tweetId: $tweetId,
      state: $state
    ) {
      ...TweetBody
    }
  }
  ${TweetBodyFragment}
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
      query: getTweetsQuery,
      variables: {
        offset: 0
      }
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
        query: getTweetsQuery,
        variables: {
          offset: 0
        }
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
      update: (store, { data }: {data: {updateTweetFavoriteState: Tweet}}) => {
        const storeData: {tweets: Tweet[]} = store.readQuery({
          query: getTweetsQuery,
          variables: {
            offset: 0
          }
        });

        const newData = storeData.tweets.map((t: Tweet) => {
          if (t.id === data.updateTweetFavoriteState.id) {
            return data.updateTweetFavoriteState;
          } 
          return t
        });

        store.writeQuery({
          query: getTweetsQuery,
          variables: {
            offset: 0
          },
          data: {
            tweets: newData
          }
        });
      }
    }).subscribe()
  }

  public loadMoreTweets() {
    
  }
}

import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { Tweet } from 'libs/models/graphql';

@Resolver('Tweet')
export class TweetsResolver {
    public tweets: Tweet[] = [
        {id: 7, authorId: 1, likes: 0, retweets: 0, text: 'Simple tweet text #8', favorite: false},
        {id: 6, authorId: 1, likes: 0, retweets: 0, text: 'Simple tweet text #7', favorite: false},
        {id: 5, authorId: 1, likes: 0, retweets: 0, text: 'Simple tweet text #6', favorite: false},
        {id: 4, authorId: 1, likes: 0, retweets: 0, text: 'Simple tweet text #5', favorite: false},
        {id: 3, authorId: 1, likes: 0, retweets: 0, text: 'Simple tweet text #4', favorite: false},
        {id: 2, authorId: 1, likes: 0, retweets: 0, text: 'Simple tweet text #3', favorite: false},
        {id: 1, authorId: 1, likes: 0, retweets: 0, text: 'Simple tweet text #2', favorite: false},
        {id: 0, authorId: 1, likes: 0, retweets: 0, text: 'Simple tweet text #1', favorite: false},
    ]

    @Query('tweets')
    async getTweets() {
        return this.tweets;
    }

    @Query('tweetById')
    async getTweetById(@Args('id') id: number) {
        return this.tweets.find(m => m.id === id);
    }

    @Mutation('newTweet')
    async createNewTweet(
        @Args('authorId') authorId: number,
        @Args('text') text: string,
    ) {
        const nextId = this.tweets.length;
        const tweet: Tweet = {
            authorId,
            text,
            id: nextId,
            likes: 0,
            retweets: 0,
            favorite: false       
        }
        this.tweets.unshift(tweet);
        return tweet;
    }

    @Mutation('updateTweetFavoriteState')
    async updateTweetFavoriteState(
        @Args('tweetId') tweetId: number,
        @Args('state') state: boolean
    ) {
        this.tweets = this.tweets.reduce((acc, curr) => {
            if (curr.id === tweetId) {
                curr.favorite = state;
            }
            acc.push(curr);
            return acc;
        }, []);
        return this.tweets;
    }
}
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { Tweet } from 'libs/models/graphql';

@Resolver('Tweet')
export class TweetsResolver {
    public tweets: Tweet[] = [
        {id: 13, authorId: 1, likes: 0, retweets: 0, text: 'Simple tweet text #14', favorite: false},
        {id: 12, authorId: 1, likes: 0, retweets: 0, text: 'Simple tweet text #13', favorite: false},
        {id: 11, authorId: 1, likes: 0, retweets: 0, text: 'Simple tweet text #12', favorite: false},
        {id: 10, authorId: 1, likes: 0, retweets: 0, text: 'Simple tweet text #11', favorite: false},
        {id: 9, authorId: 1, likes: 0, retweets: 0, text: 'Simple tweet text #10', favorite: false},
        {id: 8, authorId: 1, likes: 0, retweets: 0, text: 'Simple tweet text #9', favorite: false},
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
    async getTweets(
        @Args('offset') offset: number
    ) {
        console.log(offset)
        if (!offset) return this.tweets.slice(0, 10);
        return this.tweets.slice(offset, 10);
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
        const updatedTweet: Tweet = this.tweets.find(t => t.id === tweetId);
        updatedTweet.favorite = state;
        this.tweets = this.tweets.reduce((acc, curr) => {
            if (curr.id === tweetId) {
                curr = updatedTweet;
            }
            acc.push(curr);
            return acc;
        }, []);
        return updatedTweet;
    }
}
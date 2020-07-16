
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Message {
    id: number;
    text: string;
}

export abstract class IMutation {
    abstract newTweet(authorId: number, text: string): Tweet | Promise<Tweet>;

    abstract updateTweetFavoriteState(tweetId: number, state: boolean): Tweet[] | Promise<Tweet[]>;
}

export abstract class IQuery {
    abstract messages(): Message[] | Promise<Message[]>;

    abstract message(id: number): Message | Promise<Message>;

    abstract tweets(): Tweet[] | Promise<Tweet[]>;

    abstract tweetById(id: number): Tweet | Promise<Tweet>;
}

export class Tweet {
    id: number;
    authorId: number;
    likes: number;
    retweets: number;
    favorite: boolean;
    text: string;
}

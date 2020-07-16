import { Resolver, Query, Args } from "@nestjs/graphql";

@Resolver('Message')
export class MessagesResolver {
    messagesInDB = [
        {id: 0, text: "test message!"},
        {id: 1, text: "Another test message"}
    ]

    @Query('messages')
    async getMessages() {
        return this.messagesInDB;
    }

    @Query('message')
    async getMessageById(@Args('id') id: number) {
        return this.messagesInDB.find(m => m.id === id);
    }
}
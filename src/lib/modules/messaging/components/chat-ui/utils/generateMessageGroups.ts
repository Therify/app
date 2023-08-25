import { Message } from '../types';

const SIXTY_SECONDS = 1000 * 60;

export const generateMessageGroups = (messages: Message[]): Message[][] => {
    return messages.reduce((acc, message, i) => {
        const timestamp = new Date(message.timestamp).getTime();
        const lastGroup = acc[acc.length - 1];
        const lastMessage = lastGroup?.[lastGroup.length - 1];

        if (!lastMessage) return [[message]];
        const firstMessage = lastGroup[0];
        const sameAuthor = lastMessage.authorId === message.authorId;
        const wasSentWithinOneMinuteOfFirstMessage =
            SIXTY_SECONDS >
            Math.abs(new Date(firstMessage.timestamp).getTime() - timestamp);

        if (sameAuthor && wasSentWithinOneMinuteOfFirstMessage) {
            return [...acc.slice(0, -1), [...lastGroup, message]];
        }

        return [...acc, [message]];
    }, [] as Message[][]);
};

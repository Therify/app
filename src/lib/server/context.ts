import { AccountsService } from '@/lib/services/accounts';
import * as trpcNext from '@trpc/server/adapters/next';
import { membersService, MembersService } from '../services/members';
import {
    notificationsService,
    NotificationsService,
} from '../services/notifications';

// The app's context - is generated for each incoming request
export interface Context {
    accounts: AccountsService;
    members: MembersService;
    notifications: NotificationsService;
}
export async function createContext(
    opts?: trpcNext.CreateNextContextOptions
): Promise<Context> {
    // Create your context based on the request object
    // Will be available as `ctx` in all your resolvers

    // This is just an example of something you'd might want to do in your ctx fn
    async function getUserFromHeader() {
        if (opts?.req.headers.authorization) {
            // const user = await decodeJwtToken(req.headers.authorization.split(' ')[1])
            // return user;
        }
        return null;
    }
    const user = await getUserFromHeader();

    return {
        // user,
        notifications: notificationsService,
        accounts: AccountsService,
        members: membersService,
    };
}

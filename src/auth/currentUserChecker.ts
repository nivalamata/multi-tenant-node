import { Action } from 'routing-controllers';
import { Connection } from 'typeorm';
import { ContainerInstance, Container } from 'typedi';
import { Action as VesperAction } from 'vesper';

import { User } from '../api/models/User';
import { Logger } from '../lib/logger';
import { TokenInfoInterface, TokenInfoInterfaceForOwner } from './TokenInfoInterface';
import { AuthService } from './AuthService';
import { Owner } from '../api/models/Owner';

export function currentUserChecker(connection: Connection): (action: Action) => Promise<User | undefined> {
    const log = new Logger(__filename);

    return async function innerCurrentUserChecker(action: Action): Promise<User | undefined> {
        // here you can use request/response objects from action
        // you need to provide a user object that will be injected in controller actions
        // demo code:
        const tokeninfo: TokenInfoInterface = action.request.tokeninfo;
        const em = connection.createEntityManager();
        const user = await em.findOne<User>(User, {
            where: {
                id: tokeninfo.user_id,
            },
        });
        if (user) {
            log.info('Current user is ', user.toString());
        } else {
            log.info('Current user is undefined');
        }

        return user;
    };
}

export function currentUserVesper(connection: Connection): (container: ContainerInstance, action: VesperAction) => Promise<User | undefined | Owner> {
    const log = new Logger(__filename);
    const authService = Container.get<AuthService>(AuthService);

    return async function innerCurrentUserChecker(container: ContainerInstance, action: VesperAction): Promise<any | undefined> {
        // here you can use request/response objects from action
        // you need to provide a user object that will be injected in controller actions
        // demo code:
        const token = authService.parseTokenFromRequest(action.request);
        const client = authService.parseClientTypeFromRequest(action.request);
        if (token) {
            // Checking the header to see if client is user or owner
            switch (client) {
                case 'User':
                    const tokeninfo: TokenInfoInterface = await authService.getTokenInfoForUser(token);
                    const em = connection.createEntityManager();
                    const user = await em.findOne<User>(User, {
                        where: {
                            id: tokeninfo.user_id,
                        },
                    });
                    if (user) {
                        log.info('Current user is ', user.toString());
                    } else {
                        log.info('Current user is undefined');
                    }
                    container.set(User, user);
                    return user;
                case 'Owner':
                    const tokeninfoForOwner: TokenInfoInterfaceForOwner = await authService.getTokenInfoForOwner(token);
                    const emo = connection.createEntityManager();
                    const owner = await emo.findOne<Owner>(Owner, {
                        where: {
                            id: tokeninfoForOwner.id,
                        },
                    });
                    if (owner) {
                        log.info('Current owner is ', owner.toString());
                    } else {
                        log.info('Current owner is undefined');
                    }
                    container.set(Owner, owner);
                    return owner;
                default:
                    log.info('Invalid clientType');
            }
        } else {
            return undefined;
        }
    };
}

import { EventSubscriber, On } from 'event-dispatch';

import { Logger } from '../../lib/logger';
import { Owner } from '../models/Owner';
import { events } from './events';

const log = new Logger(__filename);

@EventSubscriber()
export class OwnerEventSubscriber {

    @On(events.owner.created)
    public onOwnerCreate(owner: Owner): void {
        log.info('Owner ' + owner.toString() + ' created!');
    }

}

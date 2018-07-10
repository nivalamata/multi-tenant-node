import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Owner } from '../models/Owner';
import { OwnerRepository } from '../repositories/OwnerRepository';
import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { events } from '../subscribers/events';
import { DeepPartial } from 'typeorm';

@Service()
export class OwnerService {

    constructor(
        @OrmRepository() private ownerRepository: OwnerRepository,
        @Logger(__filename) private log: LoggerInterface,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface
    ) { }
    public findOne(currentOwner: Owner, id: number): Promise<Owner | undefined> {
        this.log.info('Find A Owner');
        return this.ownerRepository.findOne({ where: { Id: currentOwner.id, id } });
    }

    public async create(currentOwner: Owner, owner: Owner): Promise<Owner> {
        this.log.info('Create a new owner => ', owner.toString());
        const newOwner = await this.ownerRepository.save(owner);
        this.eventDispatcher.dispatch(events.owner.created, newOwner);
        return newOwner;
    }

    public createFrom(currentOwner: Owner, args: DeepPartial<Owner>): Promise<Owner> {
        const owner: Owner = this.ownerRepository.create(args);
        return this.create(currentOwner, owner);
    }
}

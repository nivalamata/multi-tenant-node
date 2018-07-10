import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Inventory } from '../models/Inventory';
import { Owner } from '../models/Owner';
import { InventoryRepository } from '../repositories/InventoryRepository';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { DeepPartial } from 'typeorm';
import { OwnerService } from './OwnerService';

@Service()
export class InventoryService {

    constructor(
        @OrmRepository() private inventoryRepository: InventoryRepository,
        @Logger(__filename) private log: LoggerInterface,
        private ownerService: OwnerService
    ) { }
    public findOne(currentOwner: Owner, id: number): Promise<Inventory | undefined> {
        this.log.info('Find Inventory');
        return this.inventoryRepository.findOne({ where: { Id: currentOwner.id, id } });
    }
    // Method under Implementation
    public async create(currentOwner: Owner, inventory: Inventory): Promise<Inventory> {
        const owner: Owner = await this.ownerService.findOne(currentOwner, inventory.ownerid);
        console.log(owner);
        this.log.info('Create Inventory => ', inventory.toString());
        const newInventory = await this.inventoryRepository.save(inventory);
        return newInventory;
    }

    public createFrom(currentOwner: Owner, args: DeepPartial<Inventory>): Promise<Inventory> {
        const inventory: Inventory = this.inventoryRepository.create(args);
        return this.create(currentOwner, inventory);
    }
}

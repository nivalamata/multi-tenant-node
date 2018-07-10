import { EntityRepository, Repository } from 'typeorm';
import { Inventory } from '../models/Inventory';

@EntityRepository(Inventory)
export class InventoryRepository extends Repository<Inventory> {

}

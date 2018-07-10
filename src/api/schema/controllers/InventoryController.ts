import { Controller, Query, Authorized, Mutation } from 'vesper';
import { InventoryService } from '../../services/InventoryService';
import { Inventory } from '../../models/Inventory';
import { Owner } from '../../models/Owner';
import { DeepPartial } from 'typeorm';

@Controller()
export class InventoryController {

    constructor(private currentOwner: Owner,
                private inventoryService: InventoryService) {
    }
    @Query()
    @Authorized()
    public inventory(arg: { ownerid: number }): Promise<Inventory> {
        return this.inventoryService.findOne(this.currentOwner, arg.ownerid);
    }
    /**
     * This method creates inventory with reference to owner
     */
    @Mutation()
    @Authorized()
    public createInventory(args: DeepPartial<Inventory>): Promise<Inventory> {
        return this.inventoryService.createFrom(this.currentOwner, args);
    }
}

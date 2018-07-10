import { Controller, Query, Authorized, Mutation } from 'vesper';
import { OwnerService } from '../../services/OwnerService';
import { Owner } from '../../models/Owner';
import { NotAuthorized } from '../../errors/NotAuthorized';
import { DeepPartial } from 'typeorm';

@Controller()
export class OwnerController {

    constructor(private ownerService: OwnerService,
                private currentOwner: Owner) {
    }
    @Query()
    @Authorized()
    public owner(arg: { id: number }): Promise<Owner> {
        if (!this.currentOwner) {
            throw new NotAuthorized();
        }
        return this.ownerService.findOne(this.currentOwner, arg.id);
    }

    @Mutation()
    @Authorized()
    public ownerCreate(args: DeepPartial<Owner>): Promise<Owner> {
        if (!this.currentOwner) {
            throw new NotAuthorized();
        }

        return this.ownerService.createFrom(this.currentOwner, args);
    }
}

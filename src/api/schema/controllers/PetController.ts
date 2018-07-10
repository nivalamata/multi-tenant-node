import { Controller, Query, Authorized, Mutation } from 'vesper';
import { FindManyOptions, DeepPartial } from 'typeorm';

import { PetService } from '../../services/PetService';
import { Pet } from '../../models/Pet';
import { User } from '../../models/User';
import { NotAuthorized } from '../../errors/NotAuthorized';

export interface PetArgs {
    limit?: number;
    offset?: number;
    order?: string;
}

@Controller()
export class PetController {

    constructor(private currentUser: User,
                private petService: PetService) {
        // @Logger(__filename) private log: LoggerInterface) {
    }

    @Query()
    @Authorized()
    public pets(args: PetArgs): Promise<Pet[]> {
        const findOptions: FindManyOptions = {};
        if (args.limit) {
            findOptions.take = args.limit;
        }
        if (args.offset) {
            findOptions.skip = args.offset;
        }
        if (args.order === 'last') {
            findOptions.order = { id: 'DESC' };
        }
        if (args.order === 'name') {
            findOptions.order = { name: 'ASC' };
        }
        if (args.order === 'age') {
            findOptions.order = { age: 'ASC' };
        }

        return this.petService.find(this.currentUser, findOptions);
    }

    @Query()
    @Authorized()
    public pet(arg: { id: number }): Promise<Pet> {
        return this.petService.findOne(this.currentUser, arg.id);
    }

    /**
     * This method creates pets for current user
     */
    @Mutation()
    @Authorized()
    public petCreate(args: DeepPartial<Pet>): Promise<Pet> {
        if (!this.currentUser) {
            throw new NotAuthorized();
        }
        return this.petService.createFrom(this.currentUser, args);
    }

    @Mutation()
    @Authorized()
    public petDelete(arg: { id: number }): Promise<boolean> {
        if (!this.currentUser) {
            throw new NotAuthorized();
        }
        return this.petService.remove(this.currentUser, arg.id);
    }

    @Query()
    @Authorized()
    public findUserInfoForPets(arg: { user_id: number }): Promise<any> {
        if (!this.currentUser) {
            throw new NotAuthorized();
        }
        return this.petService.getUserAndPets(this.currentUser, arg.user_id);
    }

}

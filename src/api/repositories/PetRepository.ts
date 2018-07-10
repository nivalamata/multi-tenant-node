import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models/User';
import { Pet } from '../models/Pet';

@EntityRepository(Pet)
export class PetRepository extends Repository<Pet> {

    /**
     * Find by user_id is used for our data-loader to get all needed pets in one query.
     */
    public findByUserIds(ids: number[]): Promise<Pet[]> {
        return this.createQueryBuilder()
            .select()
            .where(`pet.user_id IN (${ids.map(id => `'${id}'`).join(', ')})`)
            .getMany();
    }
    /**
     * This method implements the join to get all pets of a user
     */
    public getUserAndPets(currentUser: User, id: number): Promise<any> {
        const query = this.createQueryBuilder('pet')
            .leftJoinAndSelect('pet.user', 'user')
            .where('pet.user_id = :id', {id: id}).getOne();
        return query;
    }

}

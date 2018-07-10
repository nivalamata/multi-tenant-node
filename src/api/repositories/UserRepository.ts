import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models/User';

@EntityRepository(User)
export class UserRepository extends Repository<User>  {
    public getUserAndPets(currentUser: User, id: number): Promise<any> {
        const query = this.createQueryBuilder('user')
            .leftJoinAndSelect('user.pets', 'pet')
            .where('user.id = :id', { id: id }).getOne();
        return query;
    }
}

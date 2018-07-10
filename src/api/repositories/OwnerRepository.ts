import { EntityRepository, Repository } from 'typeorm';

import { Owner } from '../models/Owner';

@EntityRepository(Owner)
export class OwnerRepository extends Repository<Owner>  {

}

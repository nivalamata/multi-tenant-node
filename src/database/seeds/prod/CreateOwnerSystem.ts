
import { EntityManager } from 'typeorm';
import { Owner } from '../../../api/models/Owner';
import { ProdSeed } from './ProdSeed';

export class CreateOwnerSystem implements ProdSeed {

    public async seed(em: EntityManager): Promise<any> {

        const owner = new Owner();
        owner.name = 'system';
        return await em.save(owner);
    }
}

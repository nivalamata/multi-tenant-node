
import { Connection } from 'typeorm/connection/Connection';

import { Client } from '../../../api/models/Client';

import { Factory, Seed } from '../../../lib/seed/types';

export class CreateManyClient implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        return await factory(Client)().seedMany(10);
    }

}

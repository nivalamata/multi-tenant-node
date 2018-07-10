import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Inventory } from './Inventory';

@Entity()
export class Owner {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @IsNotEmpty()
    @Column({ name: 'empid' })
    public empid: string;

    @OneToMany(type => Inventory, inventory => inventory.owner)
    public inventory: Inventory[];

    public toString(): string {
        return `${this.name} ${this.empid}`;
    }
}

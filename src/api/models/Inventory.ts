import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Owner } from './Owner';

@Entity()
export class Inventory {

    @PrimaryGeneratedColumn('increment')
    public assetid: number;

    @IsNotEmpty()
    @Column({ name: 'assettype' })
    public assettype: string;

    @IsNotEmpty()
    @Column({ name: 'assetname' })
    public assetname: string;

    @IsNotEmpty()
    @Column({ name: 'department' })
    public department: string;

    @Column({
        name: 'ownerid',
        nullable: true,
    })
    public ownerid: number;

    @ManyToOne(type => Owner, owner => owner.inventory)
    public owner: Owner;

    public toString(): string {
        return `${this.assetname} ${this.assettype}`;
    }
}

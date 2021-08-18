import { ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('vehicle')
@ObjectType()
export class Vehicle{

    @
    @PrimaryColumn()
    private id: number;

    @Column('varchar')
    private make: string;

    @Column('varchar')
    private model: string;

    @Column('integer')
    private year: number;

    @Column('varchar')
    private engineNumber: string;

}
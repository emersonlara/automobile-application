import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('vehicle')
@ObjectType()
export class Vehicle{

    @Field(type => Int)
    @PrimaryColumn()
    private id: number;

    @Field(type => Int)
    @Column('varchar')
    private make: string;

    @Field(type => Int)
    @Column('varchar')
    private model: string;

    @Field(type => Int)
    @Column('integer')
    private year: number;

    @Column('varchar')
    private engineNumber: string;

}
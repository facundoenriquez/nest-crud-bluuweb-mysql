import { Breed } from "src/breeds/entities/breed.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt?: Date;

    @Column({ nullable: true })
    breed_id: number;

    @ManyToOne(() => Breed, (breed) => breed.cats, {
        eager: true, // Cambiado a false para mejor performance
        nullable: true
    })
    @JoinColumn({ name: 'breed_id' })
    breed: Breed;

}

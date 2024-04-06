import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {User} from 'src/users/user.entity';


@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string 

    @Column()
    Idauthor: number

    @ManyToOne(() => User, user => user.posts) 
    author: User
}
import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany} from 'typeorm';
import {Profile} from './profile.entity'
import {Posts} from 'src/posts/posts.entity'

@Entity({name: 'users'})
export class User{

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    username: string

    @Column()
    password: string

    @Column({type: 'datetime', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date

    @Column({nullable: true})
    authStrategy: string

    @OneToOne(() => Profile)
    @JoinColumn()
        profile: Profile

    @OneToMany(()=> Posts, post => post.author)
    posts: Posts[]
    
}   

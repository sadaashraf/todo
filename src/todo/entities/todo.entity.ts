import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Todo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @CreateDateColumn()
  date?: Date;

  @Column({ default: false })
  completed: boolean;

  //many todo belong to one user
  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}

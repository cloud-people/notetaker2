import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export default class Note {
    @ObjectIdColumn()
    public _id: ObjectID;

    @Column()
    public title: string;

    @Column()
    public content: string;
}

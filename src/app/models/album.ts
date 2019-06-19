import { Post } from './post';

export class Album {
    id: string;
    name: string;
    description: string;
    posts: Post[];
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Post } from '../models/post';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) { }

  public getPosts() {
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            id: post._id,
            image: post.image
          };
        });
      }))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      })
  }

  public getPost(postId: string) {
    return this.http.get<{_id: string, title: string, image: string, album: string}>(
      'http://localhost:3000/api/posts/' + postId)
  }

  public addPost(album: string, title: string, image: File) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    this.http.post<any[]>(
      `http://localhost:3000/api/posts/${album}`, formData)
      .subscribe((responseData) => {
        this.router.navigate(['/posts']);
      });
  }

  public updatePost(id: string, title: string, image: File | string, album: string) {
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        image: image,
        album: album
      };
    }
    this.http.put('http://localhost:3000/api/posts/' + id, postData)
      .subscribe(response => {
        this.router.navigate(['/posts']);
      })
  }

  postUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  public deletePost(postId: string) {
    return this.http.delete('http://localhost:3000/api/posts/' + postId)
  }
}



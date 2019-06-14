import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../shared/post.service';
import { Subscription } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  selectedPost: Post;
  private postsSub: Subscription;
  state: string = 'default';


  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts();
    this.postsSub = this.postService.postUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  deletePost(postId) {
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts();
    });
  }
}

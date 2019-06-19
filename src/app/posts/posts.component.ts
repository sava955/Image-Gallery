import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../shared/post.service';
import { Subscription } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  post: any;
  posts: Post[] = [];
  selectedPost: Post;
  private postsSub: Subscription;
  state: string = 'default';


  constructor(private postService: PostService, private route: ActivatedRoute) { }

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

  selectPost(post: Post) {
    this.post = post;
  }

  deletePost(postId) {
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts();
    });
  }
}

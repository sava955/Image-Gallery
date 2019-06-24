import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../shared/post.service';
import { Subscription } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
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

  next() {
    let ix = 1 + this.posts.indexOf(this.post);
    if (ix >= this.posts.length) {
      ix = 0;
    }
    this.post = this.posts[ix];
  }

  prev() {
    let ix = this.posts.indexOf(this.post) - 1;
    if (ix < 0) {
      ix = this.posts.length - 1;
    }
    this.post = this.posts[ix];
  }

  deletePost(postId) {
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../shared/album.service';
import { Album } from '../models/album';

import { Post } from '../models/post';
import { PostService } from '../shared/post.service';
import { Subscription } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-album-content',
  templateUrl: './album-content.component.html',
  styleUrls: ['./album-content.component.scss'],
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
export class AlbumContentComponent implements OnInit {
  album: any;
  //posts: Post[] = [];
  post: any;
  private postsSub: Subscription;
  postDeleteIndex: number;

  constructor(
    private albumService: AlbumService,
    private postService: PostService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.album = this.getAlbum(params['albumId']);
      }
    )
  }

  getAlbum(albumId: string) {
    this.albumService.getAlbum(albumId).subscribe(
      (album) => {
        this.album = album;
      }
    );
  }

  selectPost(post: Post) {
    this.post = post;
  }

  next() {
    let ix = 1 + this.album.posts.indexOf(this.post);
    if (ix >= this.album.posts.length) {
      ix = 0;
    }
    this.post = this.album.posts[ix];
  }

  prev() {
    let ix = this.album.posts.indexOf(this.post) - 1;
    if (ix < 0) {
      ix = this.album.posts.length - 1;
    }
    this.post = this.album.posts[ix];
  }

  deleteAlbum(albumId) {
    this.albumService.deleteAlbum(albumId).subscribe(() => {
      this.albumService.getAlbums();
      console.log(albumId);
      this.router.navigate(['/albums']);
    });
  }

  deletePost(postId) {
    this.postService.deletePost(postId).subscribe(() => {
       this.album.posts.splice(this.postDeleteIndex, 1);
       this.postDeleteIndex = undefined;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../shared/album.service';
import { Album } from '../models/album';

import { Post } from '../models/post';

@Component({
  selector: 'app-album-content',
  templateUrl: './album-content.component.html',
  styleUrls: ['./album-content.component.scss']
})
export class AlbumContentComponent implements OnInit {
  album: any;
  posts: Post[] = [];
  post: any;

  constructor(private albumService: AlbumService, private route: ActivatedRoute) { }

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

}

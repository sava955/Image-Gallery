import { Component, OnInit, OnDestroy } from '@angular/core';
import { Album } from '../models/album';
import { AlbumService } from '../shared/album.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit, OnDestroy {
  albums: Album[] = [];
  private albumsSub: Subscription;

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
    this.albumService.getAlbums();
    this.albumsSub = this.albumService.albumUpdateListener()
      .subscribe((albums: Album[]) => {
        this.albums = albums;
      });
  }

  ngOnDestroy() {
    this.albumsSub.unsubscribe();
  }

}

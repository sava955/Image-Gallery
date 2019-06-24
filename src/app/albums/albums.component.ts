import { Component, OnInit, OnDestroy } from '@angular/core';
import { Album } from '../models/album';
import { AlbumService } from '../shared/album.service';
import { Subscription } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
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

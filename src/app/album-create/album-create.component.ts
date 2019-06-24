import { Component, OnInit } from '@angular/core';
import { Album } from '../models/album';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlbumService } from '../shared/album.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.scss'],
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
export class AlbumCreateComponent implements OnInit {
  form: FormGroup;
  album: Album;
  private albumId: string;
  private mode = 'create-album';

  constructor(private albumService: AlbumService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required]}),
      description: new FormControl()
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("albumId")) {
        this.mode = "album-edit";
        this.albumId = paramMap.get("albumId");
        this.albumService.getAlbum(this.albumId).subscribe(albumData => {
          this.album = {id: albumData._id, name: albumData.name, description: albumData.description, posts: albumData.posts};
        this.form.setValue({
          name: this.album.name,
          image: this.album.description,
        });
      });
      } else {
        this.mode = "create-album";
        this.albumId = null;
      }
    });
  }

  createAlbum() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create-album') {
      this.albumService.addAlbum(
        this.form.value.name,
        this.form.value.description
      );
    }
    else {
      this.albumService.updateAlbum(
        this.albumId,
        this.form.value.name,
        this.form.value.description
        )
    }
  }

}

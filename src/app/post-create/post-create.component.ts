import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../models/post';
import { Album } from '../models/album';
import { PostService } from '../shared/post.service';
import { Subscription } from 'rxjs';
import { AlbumService } from '../shared/album.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
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
export class PostCreateComponent implements OnInit, OnDestroy {
  post: Post;
  albums: Album[] = [];
  defaultAlbum: string = 'None';
  form: FormGroup;
  imagePreview: string; 
  private postId: string;
  private mode = "create-post";
  private albumsSub: Subscription;

  constructor(private postService: PostService, private albumService: AlbumService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.albumService.getAlbums();
    this.albumsSub = this.albumService.albumUpdateListener()
      .subscribe((albums: any) => {
        this.albums = albums;
      });
    this.form = new FormGroup({
      album: new FormControl(null, {validators: [Validators.required]}),
      title: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required]})
    });
    this.route.params.subscribe((params) => {
      this.albums = params['album'];
    })
    this.form.controls['album'].setValue(this.defaultAlbum, {onlySelf: true});
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'post-edit';
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId)
            .subscribe(postData => {
              this.post = {
                id: postData._id,
                title: postData.title,
                image: postData.image,
                album: postData.album
              };
              this.form.setValue({
                title: this.post.title,
                image: this.post.image,
                album: this.post.album
              });
            });
      } else {
        this.mode = 'create-post';
        this.postId = null;
      }
    })
  }

  ngOnDestroy() {
    this.albumsSub.unsubscribe();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  savePost() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create-post') {
      console.warn(this.form.value);
      debugger;
      this.postService.addPost(
      this.form.value.album,
      this.form.value.title,
      this.form.value.image
      )}
    else {
      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.image,
        this.form.value.album
      );
    } 
    this.form.reset();   
  }

}

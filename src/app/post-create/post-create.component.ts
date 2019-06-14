import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../models/post';
import { PostService } from '../shared/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  post: Post;
  form: FormGroup;
  imagePreview: string;
  private postId: string;
  private mode = "create-post";
  private albumsSub: Subscription;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required]})
    });
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
                
              };
              this.form.setValue({
                title: this.post.title,
                image: this.post.image
              });
            });
      } else {
        this.mode = 'create-post';
        this.postId = null;
      }
    })
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
      this.postService.addPost(
      this.form.value.title,
      this.form.value.image
      )}
    else {
      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.image
      );
    } 
    this.form.reset();   
  }

}

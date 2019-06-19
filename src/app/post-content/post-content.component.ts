import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../models/post';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss']
})
export class PostContentComponent implements OnInit {
  @Input() post: any;
  constructor() { }

  ngOnInit() {
  }
  
  selectPost(post: Post) {
    this.post = post;
  }

}

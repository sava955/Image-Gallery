import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PostCreateComponent } from './post-create/post-create.component';

const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'create-post', component: PostCreateComponent },
  { path: 'post-edit/:postId', component: PostCreateComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' }
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumContentComponent } from './album-content/album-content.component';
import { AlbumCreateComponent } from './album-create/album-create.component';

const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'create-post', component: PostCreateComponent },
  { path: 'post-edit/:postId', component: PostCreateComponent },
  { path: 'albums', component: AlbumsComponent },
  { path: 'create-album', component: AlbumCreateComponent },
  { path: 'album-edit/:albumId', component: AlbumCreateComponent },
  { path: ':albumId', component: AlbumContentComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' }
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

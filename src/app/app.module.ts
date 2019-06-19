import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostsComponent } from './posts/posts.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumCreateComponent } from './album-create/album-create.component';
import { AlbumContentComponent } from './album-content/album-content.component';
import { PostContentComponent } from './post-content/post-content.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
    PostCreateComponent,
    DashboardComponent,
    AlbumsComponent,
    AlbumCreateComponent,
    AlbumContentComponent,
    PostContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

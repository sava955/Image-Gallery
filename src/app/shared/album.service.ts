import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { Album } from '../models/album';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  albums: Album[] = [];
  private albumsUpdated = new Subject<Album[]>();

  constructor(private http: HttpClient, private router: Router) { }

  public getAlbums() {
    this.http.get<{message: string, albums: any}>('http://localhost:3000/api/albums')
      .pipe(map((albumData) => {
        return albumData.albums.map(album => {
          return {
            id: album._id,
            name: album.name,
            description: album.description
          }
        });
      }))
      .subscribe((transformedAlbums) => {
        this.albums = transformedAlbums;
        this.albumsUpdated.next([...this.albums]);
      });
  }

  public getAlbum(albumId: string) {
    return this.http.get<{_id: string, name: string, description: string, posts: any}>('http://localhost:3000/api/albums/' + albumId);
  }

  public albumUpdateListener() {
    return this.albumsUpdated.asObservable();
  }

  public addAlbum(name: string, description: string) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    this.http.post<any[]>('http://localhost:3000/api/albums', formData)
    .subscribe((responseData) => {
      this.router.navigate(['/albums']);
    });
  }

  public updateAlbum(id: string, name: string, description: string) {
    const album: any = { id: id, name: name, description: description }
      this.http.put('http://localhost:3000/api/albums/' + id, album)
      .subscribe(response => {
        const updatedPosts = [...this.albums];
        const oldPostIndex = updatedPosts.findIndex(a => a.id === album.id);
        updatedPosts[oldPostIndex] = album;
        this.albums = updatedPosts;
        this.albumsUpdated.next([...this.albums]);
        this.router.navigate(['/albums']);
      });
  }

  public deleteAlbum(albumId: string) {
    return this.http.delete('http://localhost:3000/api/albums/' + albumId)
  }
}

import {Post} from "../models/interfaces";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, Observer, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {response} from "express";


@Injectable({providedIn: 'root'})

export class PostsService {
  private posts: Post[] = [];
  postsUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {
  }

  getPosts(): Observable<{ message: string, posts: Post[] }> {
    return this.httpClient.get<{ message: string, posts: any }>('http://localhost:3000/api/posts');
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }


  getSinglePost(post_id: string | null): Observable<{ message: string; posts: any }> {
    return this.httpClient.get<{ message: string, posts: any }>(`http://localhost:3000/api/posts?post_id=${post_id}`);
  }

  addPost(title: string, content: string) {
    const post: Post = {_id: '', title: title, content: content};
    this.httpClient
      .post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
      .subscribe(responseData => {
        console.log(responseData.message);
        const idOfCreatedPost = responseData.postId;
        post._id = idOfCreatedPost;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });

  }

  updatePost(id: string, title: string, content: string){
    const post: Post = {_id: id, title: title, content: content};
    this.httpClient.put("http://localhost:3000/api/posts/" + id, post)
      .subscribe(response=>{
        console.log(response);
      })
  }


  deletePost(postId: string) {
    return this.httpClient.delete("http://localhost:3000/api/posts/" + postId)
  }


}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Post} from "../../models/interfaces";
import {PostsService} from "../posts.service";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {


/*  posts=[
    {title:'First Post', content: 'This is the first post\'s content'},
    {title:'Second Post', content: 'This is the second post\'s content'},
    {title:'Third Post', content: 'This is the  third post\'s content'}
  ];*/
  posts: Post[] = [];


  constructor(public postsService: PostsService) {
    this.postsService=postsService;
  }
  ngOnInit(): void {
    this.getPosts();

  }
  onDelete(postId: string){
    this.postsService.deletePost(postId).subscribe((deleted_post)=>{
      this.getPosts();
    });
  }

  ngOnDestroy() {
  }

  private getPosts() {
    this.postsService.getPosts().subscribe((data)=>{
      this.posts=data.posts;
    });
  }
}

import {Component, OnInit} from '@angular/core';

import {NgForm} from "@angular/forms";
import {PostsService} from "../posts.service";
import {Post} from "../../models/interfaces";
import {ActivatedRoute, ParamMap} from '@angular/router';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  post!: Post;
post_id:string | null="";

  constructor(public postsService: PostsService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postID')) {


        this.post_id = paramMap.get('postID');
        this.mode = 'edit'
        this.postsService.getSinglePost(this.post_id).subscribe((post_data) => {
          this.post = post_data.posts;
        })

      } else {
        this.mode = 'create';

      }

    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if(this.mode==='create'){
      this.postsService.addPost(form.value.title, form.value.content);
    } else{
      if (this.post_id)
        this.postsService.updatePost(this.post_id,form.value.title, form.value.content)
    }

    form.resetForm();
  }

}

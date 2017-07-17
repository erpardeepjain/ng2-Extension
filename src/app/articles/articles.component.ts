import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GlobalService } from '../GlobalService';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articlesList: Array<any> = [];
  articleForm: FormGroup
  constructor(public base_path_service: GlobalService, private _fb: FormBuilder) { }

  ngOnInit() {
  	this.formInit();
  	this.getArticles();
  }

  formInit(){
    this.articleForm = this._fb.group({
        title: ['', [Validators.required]],
        description: ['', []],
        cover_image: ['', []]
    });
  }

  getArticles() {
    let url = this.base_path_service.base_path +'customer/articles';

    this.base_path_service.getRequestDummy(url)
      .subscribe(res => {
        console.log(res)
        this.articlesList = res[0].json;
      },
      err => {
        console.log(err, "Error here");
      })
  }

  submitArticle(){
  	console.log(this.articleForm.value);

    let url = this.base_path_service.base_path + 'customer/articles';
    this.base_path_service.PostRequest(url, this.articleForm.value)
      .subscribe(res => {
        console.log(res)
        this.getArticles();
        this.articleForm.reset();
      },
      err => {
        console.log(err, "Error here");
      })
  }
}

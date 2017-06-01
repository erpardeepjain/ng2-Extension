import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GlobalService } from '../GlobalService';

@Component({
  moduleId: module.id,
  selector: 'app-contacts',
  templateUrl: 'contacts.component.html',
  styleUrls: ['contacts.component.css']
})

export class ContactsComponent implements OnInit {
  movies: any;
  contactForm: FormGroup
  constructor(public base_path_service: GlobalService, private _fb: FormBuilder) { }

  ngOnInit() {
    this.getMovies();
    // this.addContact();
    this.formInit();
  }

  formInit(){
    this.contactForm = this._fb.group({
        email: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  getMovies() {
    let url = this.base_path_service.base_path +'customer/customer';

    this.base_path_service.getRequestDummy(url)
      .subscribe(res => {
        console.log(res)
        this.movies = res[0].json;
      },
      err => {
        console.log(err, "Error here");
      })
  }

  addContact() {
    let url = this.base_path_service.base_path + 'customer/customer';

    let data = {
      email: this.contactForm.value.email,
      name: this.contactForm.value.email.split('@')[0],
      mobile: 9549357937590,
      password: 'password',
      is_bookmark: false
    }
    this.base_path_service.PostRequestUnautorized(url, data)
      .subscribe(res => {
        console.log(res)
        this.getMovies();
        this.contactForm.reset();
      },
      err => {
        console.log(err, "Error here");
      })
  }

  delete(movie) {
    let url = this.base_path_service.base_path + 'customer/customer/'+ movie._id;
    let data = {};
    this.base_path_service.deleteRequest(url)
      .subscribe(res => {
        console.log(res)
        // this.movies = res[0].json;
        this.getMovies();
      },
      err => {
        console.log(err, "Error here");
      })
  }

  Update(movie) {
    let url = this.base_path_service.base_path + 'customer/customer/'+ movie._id;
    let data = {
      is_bookmark: !movie.is_bookmark || false
    }

    this.base_path_service.PutRequest(url, data)
      .subscribe(res => {
        console.log(res)
        // this.movies = res[0].json;
        this.getMovies();
      },
      err => {
        console.log(err, "Error here");
      })
  }
}
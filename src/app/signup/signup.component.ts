import { Component, OnInit } from '@angular/core';
import { AuthService } from "angular2-social-login";
import { Router } from '@angular/router';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GlobalService } from '../GlobalService';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  loader: boolean = false;

  public user;
  sub: any;
  constructor(public _fb: FormBuilder, public global_service: GlobalService, public _auth: AuthService, public router: Router) { }

  ngOnInit() {
  	this.formInitilization();
  }

  formInitilization(){
  	this.registerForm = this._fb.group({
  		username: ['',[Validators.required]],
  		email: ['',[Validators.required]],
  		mobile: ['',[Validators.maxLength(10), Validators.minLength(10)]],
  		password: ['',[Validators.required]],
      facebook_auth: [false],
      google_auth: [false],
      image: ['']
  	})
  }
  register(data?){  	
  	console.log("register called with values : ", this.registerForm.value);

  	const url = this.global_service.base_path + 'customer/customer';
  	this.loader = true;

  	this.global_service.PostRequest(url, data ? data : this.registerForm.value)
  		.subscribe(res => {
  			this.loader = false;
  			this.registerForm.reset();
        this.router.navigateByUrl('');
  		},
  		err => {
  			this.registerForm.reset();
  			this.loader = false;
  			alert(err.json().error);
  			console.log(err);
  		})
  }

  signIn(provider){
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
        this.user = data;
        let obj = {username: this.user.name, email: this.user.email, password: null, mobile: null, facebook_auth: provider == "facebook" ? true : false, google_auth: provider == "google" ? true : false, image: this.user.image}
        console.log(data, "signin using social media", provider, obj);
        this.register(obj);
      },
      err => {
        console.log(err,"Error in Login via social media");
      })
  }

  logout(){
    this._auth.logout().subscribe(
      (data)=>{console.log(data);this.user=null;}
    )
  }
  /*For loop for dummy entry into DB */
  /*country(){
    const url = this.global_service.base_path + 'customer/country';
    this.loader = true;
    for(let i = 50; i < this.dummy.length; i++){
      this.global_service.PostRequest(url, this.dummy[i])
        .subscribe(res => {
          this.loader = false;
        },
        err => {
          this.loader = false;
          alert(err.json().error);
          console.log(err);
        })
    }
  }*/
}

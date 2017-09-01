import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from  '@angular/router';
import { AuthService } from "angular2-social-login";

import { GlobalService } from '../GlobalService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loader: boolean= false;
  is_login_email: boolean;
  public user;
  sub: any;

  constructor(public _fb: FormBuilder, public global_service: GlobalService, public router: Router, public _auth: AuthService) { }

  ngOnInit() {
  	this.formInitilization();
  }

  formInitilization(){
  	this.loginForm = this._fb.group({
  		email: ['erpardeepjain@gmail.com',[Validators.required]],
  		password: ['password', [Validators.required]],
      facebook_auth: [false],
      google_auth: [false],
  	})
  }

  loginFunction(){
      this.loginFun(this.loginForm.value);
  }

  loginFun(data){
  	this.loader = true;
    const url = this.global_service.base_path + 'customer/login';

    this.global_service.PostRequest(url , data)
      .subscribe(res => {
        this.loader = false;
        console.log(res[0].json.json().data, res);
        this.loginForm.reset();
        if(res[0].json.json().data){
          localStorage.setItem('userData', JSON.stringify(res[0].json.json().data))
          localStorage.setItem('token', res[0].json.json().token)
        }
        if(res[0].status == 200)
          this.router.navigateByUrl('');
      },
      err => {
        this.loader = false;
        this.global_service.popToast('success', 'Message' ,err.json().msg);
        console.log(err, err.json().msg);
        this.loginForm.reset();
      })
  }

  signIn(provider){
    // this.global_service.popToast('success', 'err.json().msg', provider);
    this.loader = true;
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
        console.log(data);
        this.user=data;
        let obj = {email: this.user.email , facebook_auth: true }
        this.loginFun(obj);
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

  twitterSignin(){
    console.log('twitterSignin Called');

    // let url = 'http://twitter.com/oauth/request_token?oauth_callback=http%3A%2F%2Fgoogle.com%2Ftwittercallback&oauth_consumer_key=0KtgyHbnSg62iBEGLrjcoWh5k&oauth_nonce=ea9ec8429b68d6b77cd5600adbbb0456&oauth_signature=F1Li3tvehgcraF8DMJ7OyxO4w9Y&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1318467427&oauth_version=1.0';
    let url = 'https://api.twitter.com/oauth/request_token';
    let data = {
      'oauth_callback':'http%3A%2F%2Fgoogle.com%2Ftwittercallback',
      'oauth_consumer_key':'0KtgyHbnSg62iBEGLrjcoWh5k',
      'oauth_nonce':'ea9ec8429b68d6b77cd5600adbbb0456',
      'oauth_signature':'F1Li3tvehgcraF8DMJ7OyxO4w9Y',
      'oauth_signature_method': 'HMAC-SHA1',
      'oauth_timestamp':'1318467427',
      'oauth_version':'1.0'
    } 

    this.global_service.PostRequestTwitter(url, {})
      .subscribe(res => {
        console.log(res);
      },
      err => {
        console.log(err);
      });
  }
}  
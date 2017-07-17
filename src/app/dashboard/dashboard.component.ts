import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any = null;

  constructor(public router: Router) { }

  ngOnInit() {
  	this.userData = JSON.parse(localStorage.getItem('userData'));
  }
  logout(){
  	localStorage.clear();
  	this.router.navigateByUrl('/login');
  }
}

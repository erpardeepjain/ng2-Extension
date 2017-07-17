import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(public router: Router){ }

	canActivate(){
		if(localStorage.getItem('userData')){
			return true;
		}

		this.router.navigateByUrl('/');
		return false;
	}
}
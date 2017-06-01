import { Injectable, EventEmitter, Input, Output } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { Route, Router } from "@angular/router";
import { FormControl } from '@angular/forms'
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'

declare var jQuery: any;
declare var toastr: any;
declare var FB: any;

@Injectable()
export class GlobalService {
    public msgs: any[] = [];

    user_info: any;
    public base_path: string;
    public refresh_token: string;
    public base_path_loader: string;
    public base_path_small_loader: string;
    public headers: Headers;
    public requestoptions: RequestOptions;
    public res: Response;


    public name_pattern: string;
    public email_pattern: string;
    public name_only: string;

    constructor(public http: Http, public router: Router) {
        this.extarsOnLoad();
    }

    public extarsOnLoad() {
        this.name_pattern = '[a-zA-ZÀ-ÿ0-9._^%$#!@&*][a-zA-ZÀ-ÿ0-9._^%$#!@&* )]{3,300}';
        this.name_only = '[a-zA-zÀ-ÿ0-9][a-zA-ZÀ-ÿ0-9 ]{1,300}$';
        this.email_pattern = '[a-zA-zÀ-ÿ_.0-9]+@[a-zA-ZÀ-ÿ]+[.][a-zA-ZÀ-ÿ.]+';

        this.user_info = JSON.parse(localStorage.getItem('user_info'));

        this.base_path = "http://localhost:8080/";
        this.refresh_token = "https://vivofyapi.innotical.com/";

        this.base_path_loader = "assets/images/squares.gif";
        this.base_path_small_loader = "assets/images/small-loader.gif";
    }

    public getRequsetOptions(url: string): RequestOptions {
        let headers;
        if (localStorage.getItem('user_info') != null) {
            let user_info = JSON.parse(localStorage.getItem('user_info'));
            headers = new Headers();
            headers.append("Content-type", "application/json");
            headers.append("Authorization", 'Bearer ' + user_info.token.access_token);
        }
        else {
            console.log('Unautorized Request !');
        }
        let requestoptions = new RequestOptions({
            method: RequestMethod.Get,
            url: url,
            headers: headers
        });

        return requestoptions;
    }
    public getRequestDummy(url) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let requestoptions = new RequestOptions({
            method: RequestMethod.Get,
            url: url,
            headers: headers
        });
        console.log(url, '*************')
        return this.http.request(new Request(requestoptions))
            .map((res: Response) => {
                let jsonObj: any;
                if (res.status === 200) {
                    jsonObj = res.json();
                }
                else if (res.status === 500) {
                    jsonObj = null;
                }
                return [{ status: res.status, json: jsonObj }]
            })
            .catch(error => {
                if (error.status === 401) {
                    return Observable.throw(error);
                }
                else {
                    return Observable.throw(error);
                }
            });
    }

    public getRequsetOptionsUnauthorised(url: string, data: any): RequestOptions {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Basic " + data);

        let requestoptions = new RequestOptions({
            method: RequestMethod.Get,
            url: url,
            headers: headers
        });
        return requestoptions;
    }


    public PostRequest(url: string, data: any, flag?: any): any {
        let url2: string;
        if (url.includes("?"))
        { url2 = url + '&format=json'; }
        else
        { url2 = url + '?format=json&' }

        let headers;
        headers = new Headers();
        headers.append("Content-Type", "application/json");
        
        this.requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: url2,
            headers: headers,
            body: JSON.stringify(data)
        })

        return this.http.request(new Request(this.requestoptions))
            .map((res: Response) => {
                return [{ status: res.status, json: res }]
            })
            .catch((error: any) => {
                console.log(error.text() ? error.text() : error);
                return Observable.throw(error);
            });
    }

    public PostRequestUnautorized(url: string, data: any): any {
        let url2: string;
        if (url.includes("?"))
        { url2 = url + '&format=json'; }
        else
        { url2 = url + '?format=json' }

        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: url2,
            headers: headers,
            body: JSON.stringify(data)
        });

        return this.http.request(new Request(requestoptions))
            .retry(3)
            .map((res: Response) => {
                if (res.status === 201) {
                    // toastr.error('Conflict ! There Might Be somthing wrong ! 409');
                    return [{ status: res.status, json: res.json() }]
                }
                else if (res.status === 205) {
                    // toastr.error('Conflict ! There Might Be somthing wrong ! 409');
                    return [{ status: res.status, json: res.json() }]
                }
                else if (res.status === 200) {
                    // toastr.error('okay ! 200');
                    return [{ status: res.status, json: res.json() }]
                }
            })
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public GetRequest(url: string): any {
        let url2: string;
        if (url.includes("?"))
        { url2 = url + '&format=json'; }
        else
        { url2 = url + '?format=json' }

        return this.http.request(new Request(this.getRequsetOptions(url2)))
            .retry(3)
            .map((res: Response) => {
                let jsonObj: any;
                if (res.status === 204) {
                    // toastr.warning('No Content Found !');
                    jsonObj = null;
                }
                else if (res.status === 500) {
                    // toastr.error('Data Is not Present For Now !');
                    jsonObj = null;
                }
                else if (res.status === 200) {
                    // toastr.success('Data Fetched From Server');
                    jsonObj = res.json()
                }
                return [{ status: res.status, json: jsonObj }]
            })
            .catch(error => {
                if (error.status == 0)
                    console.log('error here', error);
                return Observable.throw(error);
            });
    }

    /*Get Request for authorized persons only otherwise redirect to login page*/
    public GetRequestAuthorized(url: string): any {
        let url2: string;
        if (url.includes("?"))
        { url2 = url + '&format=json'; }
        else
        { url2 = url + '?format=json' }

        let headers;
        if (localStorage.getItem('user_info') != null) {
            let user_info = JSON.parse(localStorage.getItem('user_info'));
            headers = new Headers();
            headers.append("Content-type", "application/json");
            headers.append("Authorization", 'Bearer ' + user_info.token.access_token);
        }
        else {
            console.log("Login Via Global Service...");
            this.router.navigateByUrl('/login');
        }
        let requestoptions = new RequestOptions({
            method: RequestMethod.Get,
            url: url,
            headers: headers
        });

        return this.http.request(new Request(this.getRequsetOptions(url2)))
            .retry(3)
            .map((res: Response) => {
                let jsonObj: any;
                if (res.status === 204) {
                    jsonObj = null;
                }
                else if (res.status === 500) {
                    jsonObj = null;
                }
                else if (res.status === 200) {
                    jsonObj = res.json()
                }
                return [{ status: res.status, json: jsonObj }]
            })
            .catch(error => {
                if (error.status == 0)
                    console.log('Most Porbably internet Problem here, error is -', error);
                if (error.status === 401) {
                    console.log('error here*************-', error);
                    this.GetRequestAuthorized(url);
                }
                return Observable.throw(error);
            });
    }

    public GetRequestUnautorized(url: string, data: any, flag?: string): any {
        return this.http.request(new Request(this.getRequsetOptionsUnauthorised(url, data)))
            .map((res: Response) => {
                let jsonObj: any;
                if (res.status === 200) {
                    jsonObj = res.json();
                }
                else if (res.status === 500) {
                    jsonObj = null;
                }
                return [{ status: res.status, json: jsonObj }]
            })
            .catch(error => {
                if (error.status === 401) {
                    return Observable.throw(error);
                }
                else {
                    return Observable.throw(error);
                }
            });
    }

    public PutRequest(url: string, data: any): any {
        let headers;
        headers = new Headers();
        headers.append("Content-Type", "application/json");

        let requestoptions = new RequestOptions({
            method: RequestMethod.Put,
            url: url,
            body: JSON.stringify(data),
            headers: headers
        })

        return this.http.request(new Request(requestoptions))
            .map((res: Response) => {
                if (res)
                    return [{ status: res.status, json: res }]
            }).catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public deleteRequest(url: string): any {
        let headers;
        if (localStorage.getItem('user_info') != null) {
            let user_info = JSON.parse(localStorage.getItem('user_info'));
            headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", 'Bearer ' + user_info.token.access_token);
            console.log(user_info.token.access_token, 'Token');
        } else {
            console.log('Login First')
        }

        let requestoptions = new RequestOptions({
            method: RequestMethod.Delete,
            url: url,
            headers: headers
        })

        return this.http.request(new Request(requestoptions))
            .map((res: Response) => {
                if (res)
                    return [{ status: res.status, json: res }]
            }).catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public deleteRequestwithdata(url: string, data: any): any {
        let headers;
        if (localStorage.getItem('user_info') != null) {
            let user_info = JSON.parse(localStorage.getItem('user_info'));
            headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", 'Bearer ' + user_info.token.access_token);
            console.log(user_info.token.access_token, 'Token');
        } else {
            console.log('Login First')
        }

        let requestoptions = new RequestOptions({
            method: RequestMethod.Delete,
            url: url,
            headers: headers,
            body: JSON.stringify(data),
        })

        return this.http.request(new Request(requestoptions))
            .map((res: Response) => {
                if (res)
                    return [{ status: res.status, json: res }]
            }).catch((error: any) => {
                return Observable.throw(error);
            });
    }

    // Delete , Increment and decrement functions for the cart
    consoleFun(a?, b?, c?, d?, f?, g?): void {
        console.log(a, b, c, d, g);
    }

    onlyNumberKey(event) {
        return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }

    onlyDecimalKey(event) {
        // console.log(event)
        return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46;
    }
}
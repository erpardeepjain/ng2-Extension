import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { GlobalService } from '../GlobalService';

declare var $ :any;
@Component({
  moduleId: module.id,
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['todo-list.component.css']
})
export class TodoListComponent implements OnInit, AfterViewInit {
	@ViewChild('fileInput') inputEl: any;
  items: string[] = ["Noah", "Liam", "Mason", "Jacob"]
  countryList: Array<any> = [];
  branch_logo: any;
  is_valid_file: boolean;
  show_file_validation: boolean;
  article: string;

  constructor(public global_service: GlobalService) {}

  ngOnInit() {
  }

  ngAfterViewInit(){
  	// $("#textarea").mentionable("user_list_url");
  }

  getCountry(name) {
    // let url = this.global_service.base_path + 'assets/js/countries.json';
    if(name.length){
    let url = this.global_service.base_path + 'customer/country/'+ name;

    this.global_service.getRequestDummy(url)
      .subscribe(res => {
        console.log(res[0].json);
        this.countryList = []
        this.countryList = res[0].json;
      },
      err => {
        console.log(err, "Error here");
      })
    }
  }

  checkKeyCode(event){
    // console.log(event.which || event.keycode);

    // if((event.which || event.keycode) == (16 || 50 || 64)){
      /*Tab => 9*/
      let n = this.article.split(" ");
      // console.log(event.which || event.keycode, 'Activate', this.article, n[n.length - 1]);
      if(n[n.length - 1].charAt(0) == '@'){
         this.getCountry(n[n.length - 1].substr(1));
         console.log(event.which || event.keycode)
         if((event.which || event.keycode) == 9){
           let selectedCountry = this.countryList[0];
           this.countryList = [];
           this.countryList.push(selectedCountry);
         }
      }
      else
        this.countryList = [];
    // }
  }
  fileUploading(){
  	console.log('file Uploading started');
  	let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    formData.append('file[]', inputEl.files);
    console.log(formData, "************");
            /*this.http
                .post('http://your.upload.url', formData)*/
  }

  fileChangeEvent(fileInput: any){
        this.branch_logo = fileInput.target.files[0];  
        let preview = <HTMLImageElement>document.getElementById('logoId');
       
       
        // Start Validation of File  ----------------------------------
        if(this.branch_logo==undefined){
          preview.src  = ''; 
          console.log("undefined Branch Cover images");
        }
        else{
          this.is_valid_file=false;
          this.show_file_validation=false;
         
          let _validFileExtensions = ["png", "PNG", "Png","jpg","jpeg","JPG","Jpg","JPEG"];
          let file_extension = this.branch_logo.name.split('.').pop(); 
          // console.log(file _extension+ " fe");
          for(let i=0;i<_validFileExtensions.length;i++){
              if(_validFileExtensions[i]==file_extension)
              {
                  this.is_valid_file=true
              }
          } 

          if(this.is_valid_file==false){
              this.show_file_validation=true;
          }
          else{
              this.show_file_validation=false;
          }
        }
        // End Validation of File -------------------------------------
       
        let reader  = new FileReader();

        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (this.branch_logo) {
            reader.readAsDataURL(this.branch_logo);
        }
        //try
        console.log(this.branch_logo)
  }  
  
  onSubmitLogo() {                
        this.makeFileRequest().then(
            (result) => {
            // console.log(result);
            }, 
            (error) => {
                // console.error(error);
            }
        );
  } 
   
  makeFileRequest() {         
        let url = this.global_service.base_path +'customer/profile';

        return new Promise((resolve, reject) => {
           var formData: any = new FormData();
           var xhr = new XMLHttpRequest();

           formData.append("file", this.branch_logo);
           formData.append("user_id", 1);
           
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    console.log('done', xhr.response);
                }
            }
           
            xhr.open("POST", url, true);
            /*xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem('access_token')); */
            xhr.send(formData);
        });
  }
}
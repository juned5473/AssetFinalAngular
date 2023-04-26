import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DialogComponent } from '../dialog/dialog.component';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-img-dialog',
  templateUrl: './img-dialog.component.html',
  styleUrls: ['./img-dialog.component.scss']
})
export class ImgDialogComponent implements OnInit{

  imgForm!:FormGroup;
  selectedFile: any;
  url ="http://localhost:8082/api/Assets/assetImage/"+this.editData.assetId;

  constructor(private fb:FormBuilder,private http:HttpClient,private api:ApiService,private router:Router,private toast:NgToastService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<ImgDialogComponent>){}

  onFileSelected(event: any){
    this.selectedFile=event.target.files[0];
    
  }

  ngOnInit():void {
    this.imgForm = this.fb.group({
      assetId:0,
      img:['']
    });
    if(this.editData){
    this.imgForm.controls['assetId'].setValue(this.editData.assetId);
    }
  }


  // handleFileInput(file:FileList){
  //   this.selectedFile=file.item(0);
  //   let reader = new FileReader();
  //   reader.onload=(event:any)=>{
  //     this.imageUrl=event.target.result;
  //   }
  //   reader.readAsDataURL(this.selectedFile)
  // }



  onSubmit(File:any){
      this.api.postFile(this.editData.assetId,this.selectedFile).subscribe(
        {next:(res)=>{
          this.toast.success({detail:"SUCCESS",summary:"Asset Image Added Successfully",duration:5000})
        this.dialogRef.close();
       },
       error:(err)=>{
         this.toast.error({detail:"ERROR",summary:"Something went wrong!",duration:5000})
       }
      
    })
  }






}



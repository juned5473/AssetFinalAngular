import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-doc-dialog',
  templateUrl: './doc-dialog.component.html',
  styleUrls: ['./doc-dialog.component.scss']
})
export class DocDialogComponent implements OnInit{
  
  docForm!:FormGroup;
  url ="http://localhost:8082/api/Assets/getDocument/"+this.editData.assetId;

  selectedFile: any;

  constructor(private fb:FormBuilder,private http:HttpClient,private api:ApiService,private router:Router,private toast:NgToastService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<DocDialogComponent>){}

  onFileSelected(event: any){
    this.selectedFile=event.target.files[0];
  }


    redirect()
    {
    window.location.href=this.url;
    }
  

    



  ngOnInit(): void {
    this.docForm = this.fb.group({
      assetId:0,
      assetName:[''],
      doc:['']
    });
    this.docForm.controls['assetId'].setValue(this.editData.assetId);
    this.docForm.controls['assetName'].setValue(this.editData.assetName);
  }

  onSubmit(File:any){
    this.api.postDoc(this.editData.assetId,this.editData.assetName,this.selectedFile).subscribe(
      {      
        next:(res)=>{
          this.toast.success({detail:"SUCCESS",summary:"Asset Document Added Successfully",duration:5000})
      this.dialogRef.close();
      
     },
        error:(err)=>{
          this.toast.error({detail:"ERROR",summary:"Something went wrong!",duration:5000})
        }
  })
}


}

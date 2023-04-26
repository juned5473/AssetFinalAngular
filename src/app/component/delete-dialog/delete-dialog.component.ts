import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit{
  
  delForm!:FormGroup;

  constructor(private fb:FormBuilder,private http:HttpClient,private api:ApiService,private router:Router,
    @Inject(MAT_DIALOG_DATA) public editData:any,private toast:NgToastService,
    private dialogRef:MatDialogRef<DeleteDialogComponent>){}
  
  ngOnInit(): void {
    this.delForm= this.fb.group({
      assetId:0,
      assetName:[''],
    });
    this.delForm.controls['assetId'].setValue(this.editData.assetId);
    this.delForm.controls['assetName'].setValue(this.editData.assetName);  }

    Cancel(){
      this.dialogRef.close('Cancel');
  }

  deleteAsset(){
    debugger
    this.api.deleteAsset(this.editData.assetId).subscribe({
      next:(response)=>{
        this.toast.success({detail:"SUCCESS",summary:"Asset deleted Successfully",duration:5000});
        this.dialogRef.close('delete');
      }
    })
  }
}

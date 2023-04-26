import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{

  assetForm !: FormGroup;
  actionBtn : string="Save"
  constructor(private formBuilder:FormBuilder,private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData:any,private toast:NgToastService,
    private dialogRef:MatDialogRef<DialogComponent>){ }

  ngOnInit(): void {
    this.assetForm = this.formBuilder.group({
      assetId:0,
      assetName:['',Validators.required],
      assetCategory:['',Validators.required],
      assetType:['',Validators.required]
    });

    if(this.editData){
      this.actionBtn="Update";
      this.assetForm.controls['assetId'].setValue(this.editData.assetId);
      this.assetForm.controls['assetName'].setValue(this.editData.assetName);
      this.assetForm.controls['assetCategory'].setValue(this.editData.assetCategory);
      this.assetForm.controls['assetType'].setValue(this.editData.assetType);
    }
  }


  

  addAsset(){
    if(!this.editData){
      if(this.assetForm.valid){
        if(this.assetForm.valid){
          this.api.addAssets(this.assetForm.value)
          .subscribe({
            next:(res)=>{
              this.toast.success({detail:"SUCCESS",summary:"Asset added Successfully",duration:5000});
              this.assetForm.reset();
              this.dialogRef.close('save');
            },
            error:()=>{
              alert("Error while adding the asset")
            }
          })
        }
      }
    }else{
      this.updateAsset();
    }
  }


  updateAsset(){
    
    this.api.putAsset(this.assetForm.value,this.editData.assetId)
    .subscribe({
      next:(res)=>{
        debugger
        this.toast.success({detail:"SUCCESS",summary:"Asset updated Successfully",duration:5000});
        this.assetForm.reset();
        this.dialogRef.close('update');
      }
      
    })
  }
}

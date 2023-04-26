import { DataSource } from '@angular/cdk/collections';
import { Component, Inject, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
//import { DialogComponent } from './component/dialog/dialog.component';
//import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';
import { DocDialogComponent } from '../doc-dialog/doc-dialog.component';
import { ImgDialogComponent } from '../img-dialog/img-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  bulkForm!:FormGroup;

  title = 'AngularProject';

  displayedColumns: string[] = ['assetId', 'assetName', 'assetCategory', 'assetType','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable,{static:true}) table !: MatTable<any>;



  constructor(private fb:FormBuilder,private dialog:MatDialog,private api:ApiService,private router:Router,private toast:NgToastService,
    private auth:AuthService)
  {}
    

 
  
  ngOnInit(): void {
    this.getAllAssets();
  }


  bulkk(){
    // const newArr = this.dataSource.data.map(({assetImages,documents,editing, ...rest}) => {
    //   return rest;
    // }); 
    this.api.bulkAsset(this.dataSource.data)
      .subscribe({
        next:(res:any)=>{
          this.toast.success({detail:"SUCCESS",summary:"Records has been updated!",duration:5000})

        },
        error:(err)=>{
          this.toast.error({detail:"ERROR",summary:"Something went wrong!",duration:5000})
        }
      })
    }


  // editRow(row: any) {
  //   this.api.bulkAsset(row).subscribe(() => row.isEdit = false);
  // }


  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent,{
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val == 'save'){
        this.getAllAssets();
      }
    })
  }


  openImg(row:any){
    const dialogRef = this.dialog.open(ImgDialogComponent,{
      width:'40%',
      data:row
    })
  }

  openDoc(row:any){
    const dialogRef = this.dialog.open(DocDialogComponent,{
      width:'40%',
      data:row
    })
  }



  getAllAssets(){
    this.api.getAssets()
    .subscribe({
      next:(res:any)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:(err)=>{
        this.toast.error({detail:"ERROR",summary:"Something went wrong!",duration:5000})
      }
    })
  }

  editAsset(row:any){
    
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val == 'update'){
        this.getAllAssets();
      }
    })
  }

  deleteAsset(row:any){
    const dialogRef = this.dialog.open(DeleteDialogComponent ,{
      width:'40%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val == 'delete'){
        this.getAllAssets();
      }
    })
  }
  

  logout(){
    this.auth.logOut();
    this.router.navigateByUrl('/login'); 
  }
  

  selectedFile= null;

  // onFileSelected(event: any){
  //   this.selectedFile=event.target.files[0];
  // }
  // onUpload(){
  //   this.api.addImg(this.selectedFile).subscribe({
  //     next:(response)=>{
  //       this.router.navigate(['list-asset'])
  //     }
  //   })
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

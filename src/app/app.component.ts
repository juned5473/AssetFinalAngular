import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './component/dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'AngularProject';

  // displayedColumns: string[] = ['assetId', 'assetName', 'assetCategory', 'assetType','action'];
  // dataSource!: MatTableDataSource<any>;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;



  // constructor(private dialog:MatDialog,private api:ApiService)
  // {

  // }
  // ngOnInit(): void {
  //   this.getAllAssets();
  // }

  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogComponent,{
  //     width:'30%'
  //   }).afterClosed().subscribe(val=>{
  //     if(val == 'save'){
  //       this.getAllAssets();
  //     }
  //   })
  // }

  // getAllAssets(){
  //   this.api.getAssets()
  //   .subscribe({
  //     next:(res)=>{
  //       this.dataSource=new MatTableDataSource(res);
  //       this.dataSource.paginator=this.paginator;
  //       this.dataSource.sort=this.sort;
  //     },
  //     error:(err)=>{
  //       alert("Error while fetching the Records!!")
  //     }
  //   })
  // }

  // editAsset(row:any){
  //   this.dialog.open(DialogComponent,{
  //     width:'30%',
  //     data:row
  //   }).afterClosed().subscribe(val=>{
  //     if(val == 'update'){
  //       this.getAllAssets();
  //     }
  //   })
  // }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}

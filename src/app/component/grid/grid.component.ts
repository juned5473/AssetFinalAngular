import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent{
  public columnDefs: ColDef[] = [
    { field: 'assetId'},
    { field: 'assetName'},
    { field: 'assetCategory'},
    { field: 'assetType'},
  
    // { field: 'assetImages'},
    // { field: 'documents'},
    
    ];
   
    // DefaultColDef sets props common to all Columns
    public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    };

    
    
    // Data that gets displayed in the grid
    public rowData$!: Observable<any[]>;
   
    // For accessing the Grid's API
    @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
   
    constructor(private http: HttpClient,private auth:AuthService,private router:Router) {}
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  
    // Example load data from sever
   onGridReady(params: GridReadyEvent) {
    debugger
    this.rowData$ = this.http
      .get<any[]>('http://localhost:8082/api/Assets');
    }
   
    // Example of consuming Gri Event
    onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
    }
   
    // Example using Grid's API
    clearSelection(): void {
    this.agGrid.api.deselectAll();
    }

    logout(){
      this.auth.logOut();
      this.router.navigateByUrl('/login'); 
    }
}

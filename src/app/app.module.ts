import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './component/dialog/dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { NavComponent } from './component/nav/nav.component';
import { ImgDialogComponent } from './component/img-dialog/img-dialog.component';
import { DocDialogComponent } from './component/doc-dialog/doc-dialog.component';
import { GridComponent } from './component/grid/grid.component';
import { AgGridAngular } from 'ag-grid-angular/public-api';
import { AgGridModule } from 'ag-grid-angular';
import { CustomInterceptor } from './services/custom.interceptor';
import { NgToastModule } from 'ng-angular-popup';
import { DeleteDialogComponent } from './component/delete-dialog/delete-dialog.component'
import {MatCheckbox, MatCheckboxModule} from '@angular/material/checkbox';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    HomeComponent,
    LoginComponent,
    NavComponent,
    ImgDialogComponent,
    DocDialogComponent,
    GridComponent,
    DeleteDialogComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AgGridModule,
    NgToastModule,
    MatCheckboxModule
  
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,useClass:CustomInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

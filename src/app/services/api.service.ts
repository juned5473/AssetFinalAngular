import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient){ }


  private baseUrl: string ="http://localhost:8082/api/Assets/";

  addAssets(data : any){
    return this.http.post(this.baseUrl,data,{responseType: 'text'})
  }

  getAssets(){
  
    return this.http.get<any>(this.baseUrl)
  }

  putAsset(data:any,id:number)
  {
     return this.http.put(this.baseUrl,data,{responseType: 'text'});
  }

  bulkAsset(data:any)
  {
     return this.http.post(this.baseUrl+"bulkUpdate",data,{responseType: 'text'});
  }

  deleteAsset(id:number)
  {
    return this.http.delete(this.baseUrl+id,{responseType: 'text'});
  }

  getImg(id:number){
    return this.http.get<any>(this.baseUrl+id);
  }

  getDoc(id:number){
    return this.http.get<any>(this.baseUrl+id);
  }

  postFile(id:any,selectedFile:File){
    const formdata:FormData=new FormData();
    formdata.append('AssetId',id)
    formdata.append('File',selectedFile);
    return this.http.post(this.baseUrl+"addImage",formdata,{responseType: 'text'})
  }

  postDoc(id:any,data:any,selectedFile:File){
    const formdata:FormData=new FormData();
    formdata.append('AssetId',id)
    formdata.append('DocumentTitle',selectedFile.name);
    formdata.append('Description',data);
    formdata.append('File',selectedFile);
    //formdata.append('Name',selectedFile,selectedFile.name);
   // formdata.append('Content',selectedFile,selectedFile.name);
    return this.http.post(this.baseUrl+"addDocument",formdata,{responseType: 'text'})
  }
}

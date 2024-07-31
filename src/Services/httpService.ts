import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Story } from "../Models/Story";
import { environment } from "../Environments/environment";

@Injectable({
    providedIn: 'root', // Singleton service provided in the root injector
  })
export class HttpService{
private apiURL=environment.apiURL;
constructor(private http: HttpClient) {
    
}
getStories():Observable<Story[]>{
    return this.http.get<Story[]>(this.apiURL+'/Stories');
}
search(searchParam:string):Observable<Story[]>{
    let url=this.apiURL+"/Stories/Search";
    if(searchParam!=='')
      url+="?name="+searchParam;
    return this.http.get<Story[]>(url);
}
}
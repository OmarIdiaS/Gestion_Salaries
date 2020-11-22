import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalariesService {
  public host:string = "http://127.0.0.1:8080/";
  public salaries:any = []; 

  constructor(private http:HttpClient) { }

  public getAll(url){
    return this.http.get(this.host + url);
  }


  public sendInfoSalaries(url:string, nom:string, prenom:string, dateDeNaissance:string, NSS:string){
    return this.http.post(this.host + url , {
      "nom" : nom,
      "prenom" : prenom,
      "dateDeNaissance" : dateDeNaissance, 
      "numSecuriteSociale" : NSS
    })
  }


}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SalariesService } from './salaries.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public salaries:any = []; 
  public verifNom:boolean;
  public verifPrenom:boolean;
  public verifDate:boolean;
  public verifNSS:boolean;
  public changePage:boolean = true; 
  public verifExistence:boolean = false;
  private infoEnvoyer:boolean= false; 

  constructor(private salariesServices:SalariesService){}
  public url = "http://127.0.0.1:8080/";

    ngOnInit(): void{
      this.getSalaries();
    }

    getSalaries(){
      this.salaries = [];
      this.salariesServices.getAll("salaries")
      .subscribe(
        data => 
        {
          (<any>data)._embedded.salaries.map(
            s =>{
              this.salaries.push({
                "nom": s.nom.split("[")[0],
                "prenom" : s.prenom.split("[")[0],
                "dateDeNaissance" : s.dateDeNaissance.split("[")[0], 
                "numSecuriteSociale" : s.numSecuriteSociale.split("[")[0]
              });
              this.salaries.push({
                "nom": s.nom.split("[")[1],
                "prenom" : s.prenom.split("[")[1] , 
                "dateDeNaissance" : s.dateDeNaissance.split("[")[1], 
                "numSecuriteSociale" : s.numSecuriteSociale.split("[")[1]
              });
            }
          )
          }, 
        err => {console.log(err)}
      );
    }
  

  sendValues(val, salariesForm){

    if(val.nom.indexOf("[") <= 0 && val.nom != ""){
      this.verifNom = false
    }else{
      this.verifNom = true
    }

    if(val.prenom.indexOf("[") <= 0 && val.prenom != ""){
      this.verifPrenom = false
    }else{
      this.verifPrenom = true
    }
    

    val.numSecuriteSociale.toString().length !== 15 ? (
      this.verifNSS = true
      ) : (
      this.verifNSS = false
      )


    let verifAge = val.dateDeNaissance.split("-");
    var date = new Date(); 
    if(date.getFullYear() - verifAge[0] >= 18 && date.getFullYear() - verifAge[0] <= 70){
      if(date.getFullYear() - verifAge[0] === 18){
        if(date.getMonth() + 1 - verifAge[1] >= 0){
          this.verifDate = false;
        }else{
          this.verifDate = true;
        }
      }else{
        this.verifDate = false;
      }
    }else{
      this.verifDate = true
    }

    
    if(this.verifNom === false && this.verifPrenom === false && this.verifNSS === false && this.verifDate === false){
        this.verifExistence = false;
        this.salariesServices.sendInfoSalaries("salaries",this.addCaractereSeparation(val.nom), this.addCaractereSeparation(val.prenom), this.addCaractereSeparation(val.dateDeNaissance), this.addCaractereSeparation(val.numSecuriteSociale))
        
            .subscribe(data  => {
              console.log("Données envoyées avec Succes ", data);
              this.getSalaries();
              this.infoEnvoyer = true;
              salariesForm.resetForm();
            },
            error => {
              this.verifExistence = true;
            });
    }
  }
 
  changeToOtherPage(value){
    this.changePage = value;
  }

  addCaractereSeparation(val){
    return val + "[" + val;
  }
}

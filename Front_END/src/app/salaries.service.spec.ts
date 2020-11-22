import { TestBed , inject} from '@angular/core/testing';

import { SalariesService } from './salaries.service';

import {HttpClient, HttpClientModule} from "@angular/common/http"
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"

describe('SalariesService', () => {
  let service: SalariesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ SalariesService ]
  });
    service = TestBed.inject(SalariesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  let http, backend; 

  beforeEach(inject([SalariesService, HttpClient, HttpTestingController],(
    conf : SalariesService, 
    _h : HttpClient, 
    _b: HttpTestingController
  ) => {
    service = conf;
    http = _h;
    backend = _b;
  }));


  afterEach(inject([HttpTestingController], (httpMock : HttpTestingController) => {
    httpMock.verify();
  }));


  it('should get data', () => {
    service.getAll('salaries').subscribe(res => {
      expect(res).toBe('pan');
    });

    const req = backend.expectOne({
      url : "http://127.0.0.1:8080/salaries",
      method : 'GET'
    });

    req.flush('pan' , {status : 200 , statusText : 'ok'});
  })


  it('should post data', () => {
    service.sendInfoSalaries('salaries',"nom", "prenom", "dateDeNaissance", "NSS").subscribe(res => {
      expect(res).toBe('pan');
    });

    const req = backend.expectOne({
      url : "http://127.0.0.1:8080/salaries",
      method : 'POST'
    });

    req.flush('pan' , {status : 200 , statusText : 'ok'});
  })

});

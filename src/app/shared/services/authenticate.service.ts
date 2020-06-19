import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  userAuthenticated: boolean;
  constructor(private http: HttpClient) {
   }

   checkUser(credentials) {
    return this.http.get<any>(`../../assets/credentials.json`)
      .pipe(map(users => {
        console.log(users);
        const userData = users.users ;
        return (userData.filter(x => x.emailId === credentials.emailId && x.password ===  credentials.password)).length  > 0 ;
    }));
  }
}

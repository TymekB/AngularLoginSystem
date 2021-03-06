import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInterface} from '../interfaces/user-interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    readonly httpOptions;

    constructor(private http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    authenticateUser(user: UserInterface): Observable<any> {
        return this.http.post('http://localhost/api/login_check', user, this.httpOptions);
    }

    refreshToken(): Observable<any> {
        return this.http.post('http://localhost/api/token/refresh', null);
    }

    setUser(user: UserInterface) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    logout() {
        localStorage.removeItem('user');
    }

    isLoggedIn() {
        return localStorage.getItem('user') !== null;
    }
}



import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order, ProductsResponse} from "../../../shared/models/products";
import {User} from "../../../shared/models/user";
import {endpoints} from '../../../enviroments/endpoints';


@Injectable({
  providedIn: 'root'
})
export class DataService {



  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 2d4b8422-c7f4-4b1d-8b73-439bba7af688'
    })
  }


  constructor(private http: HttpClient) { }


  getProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(endpoints.findAllProduct.path);
  }


  login(email: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'email': email,
        'password': password
      })
    };

    return this.http.post(endpoints.login.path, {}, httpOptions);
  }


  createUser(user: any): Observable<any> {
    return this.http.post<any>(endpoints.createUser.path, user,);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(endpoints.updateUser.path, user,);
  }

  deleteUser(email: string): Observable<any> {
    return this.http.delete<any>(endpoints.deleteUser.path + email,);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(endpoints.findAllUsers.path);
  }

  addUser(user:User[]) {
    console.log(user);
    return  this.http.post(endpoints.findAllUsers.path,user,this.httpOptions);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(endpoints.findAllOrders.path);
  }
}

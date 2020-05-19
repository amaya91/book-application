import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Book } from '../../models/book.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { catchError } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) {}

  addBook(book: Book): Observable<Book> {
    console.log('ADDING: ' + JSON.stringify(book));
    return this.http.post<Book>(environment.URL, book, this.httpOptions).pipe(
      catchError(this.handleError)
    );
        // throw new Error('Not yet implemented!');
    
}

handleError(error) {
let errorMessage = '';
if (error.error instanceof ErrorEvent) {
    // client-side error
    errorMessage = `Error: ${error.error.message}`;
} else {
    // server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
}
console.log(errorMessage);
return throwError(errorMessage);
}


  deleteBook(id: string | number): Observable<any> {
    return this.http.delete(environment.URL + id).pipe();
    // throw new Error('Not yet implemented!');
  }

  updateBook(book: Book): Observable<Book>{
    console.log('UPDATING: ' + book);
    return this.http.put<Book>(environment.URL, book, this.httpOptions).pipe();
    // throw new Error('Not yet implemented!');
  }

  getBooks(): Observable<Book[]> {
    console.log('GETTING BOOKS');
    return this.http.get<Book[]>(environment.URL).pipe();
        // throw new Error('Not yet implemented!')
  }
}
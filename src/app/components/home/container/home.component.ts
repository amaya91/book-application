import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { ViewMode } from '../../../models/view-mode.model';
import { HomeListComponent } from '../home-list/home-list.component';
import { HomeDetailsComponent } from '../home-details/home-details.component';
import { HomeFormComponent } from '../home-form/home-form.component';
import { Book } from '../../../models/book.model';
import { SaveBook } from 'app/models/saveBook.model';
import { BookService } from 'app/services/book/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  @ViewChild(HomeListComponent, { static: true })
  homeList: HomeListComponent;
  @ViewChild(HomeDetailsComponent, { static: false })
  homeDetails: HomeDetailsComponent;
  @ViewChild(HomeFormComponent, { static: false })
  homeForm: HomeFormComponent;

  viewMode: ViewMode;
  books: Book[];
  selectedBook: Book;


  constructor(
    private bookService: BookService
  ) {}

  ngOnInit(){
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    })
    // this.viewMode = ViewMode.Edit;
    this.viewMode = ViewMode.Table;
    // throw new Error('Not yet implemented!');
  }

  // ngAfterViewInit() {

  // }

  fetchBooks(): void {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    })
    // throw new Error('Not yet implemented!');
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
    this.viewModeChanged(ViewMode.Details);
    // throw new Error('Not yet implemented!');
  }

  viewModeChanged(viewMode: ViewMode): void {
    if(viewMode == ViewMode.Add) {
      this.viewMode = ViewMode.Add;
    } if(viewMode == ViewMode.Details) {
      this.viewMode = ViewMode.Details;
    } if(viewMode == ViewMode.Edit) {
      this.viewMode = ViewMode.Edit;
    } if(viewMode == ViewMode.Table) {
      this.viewMode = ViewMode.Table;
    }
    // throw new Error('Not yet implemented!');
  }

  addBook(): void{
    this.selectedBook = {id:0,title: '',author:'',genre:'',publisher:''};
    this.viewModeChanged(ViewMode.Add);
    // throw new Error('Not yet implemented!');
  }

  saveBook(payload: SaveBook): void {
    if(payload.type == 'save') {
      this.bookService.addBook(payload.book).subscribe(data => 
        console.log(data));
        this.fetchBooks();
    } if(payload.type == 'update') {
      payload.book.id = this.selectedBook.id; 
      // NEEDS ID TO WORK
      this.bookService.updateBook(payload.book).subscribe(data => 
        console.log(data));
        this.fetchBooks();
    }
    // throw new Error('Not yet implemented!');
  }

  get detailsEnabled(): boolean {
    if(this.viewMode == ViewMode.Table) {
       return false;
     } if(this.viewMode == ViewMode.Details) {
       return true;
     }
    // throw new Error('Not yet implemented!');
  }
  get formEnabled(): boolean {
    if(this.viewMode == ViewMode.Add) {
     return true;
    } if(this.viewMode == ViewMode.Edit) {
      return true;
    }if(this.viewMode == ViewMode.Table) {
      return false;
    }
    // throw new Error('Not yet implemented!');
  }
}
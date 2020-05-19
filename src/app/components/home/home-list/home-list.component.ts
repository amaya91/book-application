import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../../models/book.model';
import { InputTextEvent } from '../../../models/inputTextEvent.model';
import { ViewMode } from '../../../models/view-mode.model';
import { RowSelectEvent } from 'app/models/rowSelectEvent.model';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html'
})
export class HomeListComponent implements OnInit {
   // These values will be pulled from a parent component
   @Input() books: Book[];
   @Input() viewMode: ViewMode;
 
   // This value will push to a parent component
   @Output() selectBook: EventEmitter<Book> = new EventEmitter(); 
 
   book: Book;
   filterText: string;
 
   constructor() {}
 
   ngOnInit() {}
 
   get filteredBooks(): Book[] {
    return this.books.filter(o =>
        Object.keys(o).some(k => o[k].toLowerCase().includes(this.filterText.toLowerCase())));
    //  throw new Error('Not yet implemented!');
   }
 
   onSearch(search: InputTextEvent): void {
     if(search.target.value.length > 0) {
       this.filterText = search.target.value;
       console.log(this.filteredBooks);
     }
    //  throw new Error('Not yet implemented!');
   }

   onSelectBook(): void{
     this.selectBook.emit(this.book);
    //  throw new Error('Not yet implemented!');
   }
 
   get canSearch(): boolean {
    //  if(this.filterText) {
    //    return true;
    //  } else return false;
     throw new Error('Not yet implemented!');
   }
 }
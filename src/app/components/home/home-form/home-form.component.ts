import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from 'app/models/book.model';
import { ViewMode } from 'app/models/view-mode.model';
import { Payload } from 'app/models/savePayload.model';
import { SaveBook } from 'app/models/saveBook.model';

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html'
})
export class HomeFormComponent implements OnInit {
  // These values will be pulled from a parent component
  @Input() viewMode: 'Add' | 'Edit';
  @Input() book: Book;

  // These values will push to a parent component
  @Output() viewModeChange: EventEmitter<ViewMode> = new EventEmitter();
  @Output() saveBook: EventEmitter<Payload> = new EventEmitter();

  homeForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required),
    publisher: new FormControl('', Validators.required)
  });

  payload: SaveBook = {
    type: 'save',
    book: {
      id: 0,
      title: '',
      author: '',
      genre: '',
      publisher: ''
        }
  };

  constructor() {}

  ngOnInit(): void {

    // this.viewMode = 'Edit';
    // throw new Error('Not yet implemented!');
  }

  onSaveClick(): void {

      this.homeForm.controls.author.markAsDirty();
      this.homeForm.controls.title.markAsDirty();
      this.homeForm.controls.genre.markAsDirty();
      this.homeForm.controls.publisher.markAsDirty();

      this.constructPayload();
      console.log(this.payload);
      if(this.homeForm.valid) {
        this.saveBook.emit(this.payload);
      }
        this.viewModeChange.emit(ViewMode.Table);

    // throw new Error('Not yet implemented!');
  }

  constructPayload(): Payload {
    if(this.book.id > 0){
      if(!this.isDifferent){


      }
      this.payload.type = 'update';
      this.payload.book = this.homeForm.value;

    } else {
      this.payload.type = 'save';
      // this.payload.book.id = this.book.id;
      this.payload.book = this.homeForm.value;
    }

    return this.payload;
    // throw new Error('Not yet implemented!');
  }

  onCancelClick(): void {
    this.viewModeChange.emit(ViewMode.Table);
    // throw new Error('Not yet implemented!');
  }

  get isDifferent(): boolean {
    if(this.homeForm.controls.title.value != ''){
      return true;
    }
    return false;
    // throw new Error('Not yet implemented!');
  }
}

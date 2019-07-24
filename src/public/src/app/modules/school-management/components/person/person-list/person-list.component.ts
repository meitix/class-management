import { Component, OnInit, Input, Output } from '@angular/core';
import { IPerson } from '../../../models/people/person.interface';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  @Input() people: Array<IPerson>;
  // tslint:disable-next-line: no-output-rename
  @Output('delete') deleteEvent: EventEmitter<any>;
  constructor() {
    this.deleteEvent = new EventEmitter();
  }

  ngOnInit() {
  }

  delete(person: any) {
    this.deleteEvent.emit(person);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { IPerson } from '../../../models/people/person.interface';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  @Input() people: Array<IPerson>;

  constructor() { }

  ngOnInit() {
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  handle(err: Error , message: string) {
    console.log(err);
    alert(message);
  };
}

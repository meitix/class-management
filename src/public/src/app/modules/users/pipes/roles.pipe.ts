import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roles'
})

export class RolesPipe implements PipeTransform {

  transform(value: string[]): string {

    let res = '';
    if (!value) { return res; }

    for (let i = 0 ; i < value.length ; i++) {
       res =  res.concat(value[i]);
        if (i < value.length - 1) {
         res = res.concat(' ، ');
        }
    }
    return res;
  }

}

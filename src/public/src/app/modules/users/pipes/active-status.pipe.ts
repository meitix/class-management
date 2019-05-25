import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeSatus'
})
export class ActiveStatusPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? '<span class="text-success">فعال</span>' : '<span class="text-danger">غیر فعال</span>';
  }

}

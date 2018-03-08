import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summ'
})
export class SummPipe implements PipeTransform {

  transform(value: number, quantity: number = 1): number {
    return value * quantity;
  }

}

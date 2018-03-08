import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(value: number, discount: number = 0): number {
    return Math.round(value * (100 - discount)) / 100;
  }

}

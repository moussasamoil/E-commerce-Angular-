import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buy'
})
export class BuyPipe implements PipeTransform {

  transform(name:string): string {
    return `buy ${name}` ;
  }

}

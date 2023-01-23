import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkConvert'
})
export class LinkConvertPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.toLowerCase().replace(/ /g,"-");
  }
}

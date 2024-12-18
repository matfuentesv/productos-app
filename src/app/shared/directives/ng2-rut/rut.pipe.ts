import {Pipe, PipeTransform} from '@angular/core';
import {rutFormat} from 'rut-helpers';

@Pipe({
  standalone: true,
  name: 'rut'
})
export class RutPipe implements PipeTransform {
  public transform(value: string): string {
    return rutFormat(value);
  }
}

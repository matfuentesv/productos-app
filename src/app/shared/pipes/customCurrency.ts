import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'customCurrency',
  standalone: true
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: number | string): string | null {

    const numericValue = parseFloat(value.toString());

    let formattedValue = numericValue.toFixed(2);
    formattedValue = formattedValue.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    formattedValue = formattedValue.replace(/,00$/, '');
    return `$${formattedValue}`;
  }
}

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'customCurrency',
  standalone: true
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: number | string | null | undefined): string | null {
    // Validar valores nulos o indefinidos
    if (value === null || value === undefined || isNaN(Number(value))) {
      return null;
    }

    const numericValue = parseFloat(value.toString());
    let formattedValue = numericValue.toFixed(2);

    formattedValue = formattedValue.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    formattedValue = formattedValue.replace(/,00$/, '');

    return `$${formattedValue}`;
  }
}

import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RutPipe} from './rut.pipe';
import {RutValidatorDirective} from './rut-validator.directive';
import {RutDirective} from './rut.directive';
import {RutValueAccessorDirective} from './rut-value-accessor.directive';

export { RutPipe } from './rut.pipe';
export { RutValidatorDirective } from './rut-validator.directive';
export { RutDirective } from './rut.directive';
export { RutValueAccessorDirective } from './rut-value-accessor.directive';

@NgModule({
  imports: [
    FormsModule,
    RutPipe,
    RutDirective,
    RutValidatorDirective,
    RutValueAccessorDirective,
  ],

  exports: [
    RutPipe,
    RutDirective,
    RutValidatorDirective,
    RutValueAccessorDirective,
  ],
})
export class Ng2Rut2 {}

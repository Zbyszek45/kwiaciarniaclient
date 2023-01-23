import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkConvertPipe } from './link-convert.pipe';


@NgModule({
  declarations: [LinkConvertPipe],
  imports: [
    CommonModule
  ],
  exports: [
    LinkConvertPipe
  ]
})
export class PipesModule { }

import {Directive, HostListener, Output} from '@angular/core';
import {EventEmitter} from '@angular/core';

@Directive({
  selector: '[ctrl-enter]'
})
export class CtrlEnterDirective {

  @Output('ctrl-enter') action = new EventEmitter();

  @HostListener('keydown', ['$event']) keydownHandler(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === 'Enter') {
      this.action.emit(null);
    }
  }

  constructor() { }
}

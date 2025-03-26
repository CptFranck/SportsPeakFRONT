import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {

  @Output() onInput: EventEmitter<string> = new EventEmitter();

  onInputSearch(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.onInput.emit(event.target.value);
    }
  }
}

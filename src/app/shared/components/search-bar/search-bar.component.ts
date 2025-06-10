import {Component, output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {

  readonly onInput = output<string>();

  onInputSearch(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.onInput.emit(event.target.value);
    }
  }
}

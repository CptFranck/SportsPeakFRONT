import {Component, computed, input, model, output} from '@angular/core';
import {LoadingComponent} from "../../loading/loading.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MultiSelectOption} from "../../../model/component/multi-select/multiSelectOption";

@Component({
  selector: 'app-multi-select-options',
  imports: [
    LoadingComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './multi-select-options.component.html',
  styleUrl: './multi-select-options.component.css'
})
export class MultiSelectOptionsComponent {
  searchInput = model<string>("");

  readonly isLoading = input.required<boolean>();
  readonly optionList = input.required<MultiSelectOption[]>();
  readonly selectedOptions = input.required<number[]>();
  readonly addDescriptionToOption = input.required<boolean>();

  readonly displayedOptions = computed<MultiSelectOption[]>(() => {
    const searchInput = this.searchInput().toLocaleLowerCase();
    if (searchInput === "") return this.optionList();
    return this.optionList().filter(opt => opt.title.toLocaleLowerCase().includes(searchInput) ||
      opt.description?.toLocaleLowerCase().includes(searchInput));
  });

  readonly optionResult = computed<boolean>(() => this.displayedOptions().length !== 0);

  readonly onClickOption = output<number>();
  readonly onClickAllOption = output<void>();

  onClickClear() {
    this.searchInput.set("");
  }

  onClickOption_(id: number) {
    this.onClickOption.emit(id);
  }

  onClickAllOption_() {
    this.onClickAllOption.emit();
  }
}

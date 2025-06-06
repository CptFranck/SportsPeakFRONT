import {Component, computed, HostListener, input, output, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MultiSelectOption} from "../../shared/model/component/multi-select/multiSelectOption";
import {MultiSelectOptionSelected} from "../../shared/model/component/multi-select/multiSelectOptionSelected";
import {
  MultiSelectSelectedOptionsComponent
} from "./multi-select-selected-options/multi-select-selected-options.component";
import {MultiSelectOptionsComponent} from "./multi-select-options/multi-select-options.component";

@Component({
  selector: 'app-multi-select',
  imports: [
    FormsModule,
    MultiSelectSelectedOptionsComponent,
    MultiSelectOptionsComponent,
  ],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.css'
})
export class MultiSelectComponent {
  open = signal(false);

  readonly isLoading = input.required<boolean>();
  readonly optionList = input.required<MultiSelectOption[]>();
  readonly selectedOptions = input.required<number[]>();

  readonly displayLimit = input<number>(0);
  readonly addDescriptionToTag = input<boolean>(false);
  readonly addDescriptionToOption = input<boolean>(false);

  readonly optionMap = computed<Map<number, MultiSelectOption>>(() =>
    new Map(this.optionList().map(opt => [opt.id, opt])));

  readonly displayedSelectedOptions = computed<MultiSelectOptionSelected[]>(() => {
    const optionMap = this.optionMap();
    const displayLimit = this.displayLimit();
    const selectedOptions = this.selectedOptions();

    let displayedSelectedOptions = selectedOptions.map((id: number) => {
      const option = optionMap.get(id);
      return {id: id, title: option ? option.title : ""}
    });

    const length = selectedOptions.length;
    if (displayLimit !== 0 && length > displayLimit) {
      displayedSelectedOptions = displayedSelectedOptions.slice(0, displayLimit);
      displayedSelectedOptions.push({id: -1, title: '+' + (length - displayLimit).toString()});
    }

    if (this.addDescriptionToTag())
      displayedSelectedOptions.forEach((option: MultiSelectOptionSelected) => {
        const opt = optionMap.get(option.id);
        if (opt?.description) option.title += " : " + opt.description;
      })

    return displayedSelectedOptions;
  });

  readonly onTouched = output<void>();
  readonly onChange = output<number[]>();

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-select') &&
      !target.classList.contains('remove-tag') &&
      !target.classList.contains('fa-close'))
      this.open.set(false);
  }

  onCLickSelect(mouseEvent: MouseEvent) {
    const selectBox: EventTarget | null = mouseEvent.target;
    if (!(selectBox instanceof HTMLElement)) return;
    if (!selectBox.closest(".tag") && !selectBox.closest(".remove-all-tag")) {
      this.open.update(value => !value);
      this.onTouched.emit()
    }
  }

  onClickAllOption() {
    let optionList = this.optionList();
    let newSelectedOptions: number[] = [];
    if (optionList.length !== this.selectedOptions().length)
      newSelectedOptions = optionList.map(opt => opt.id);
    this.onChange.emit(newSelectedOptions);
    this.onTouched.emit()
  }

  onClickOption(optionId: number) {
    let newSelectedOptions = this.selectedOptions();
    if (newSelectedOptions.includes(optionId))
      newSelectedOptions = newSelectedOptions.filter(id => id !== optionId);
    else
      newSelectedOptions.push(optionId);
    this.onChange.emit(newSelectedOptions);
    this.onTouched.emit()
  }

  onCLickRemoveTag(selectedOptionId: number) {
    this.onChange.emit(this.selectedOptions().filter(id => id !== selectedOptionId));
    this.onTouched.emit()
  }

  onCLickRemoveAllTag() {
    this.onChange.emit([]);
    this.onTouched.emit()
  }
}



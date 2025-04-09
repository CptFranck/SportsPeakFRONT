import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  signal,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MultiSelectOption} from "../../interface/components/multi-select/multiSelectOption";
import {MultiSelectOptionSelected} from "../../interface/components/multi-select/multiSelectOptionSelected";
import {LoadingComponent} from "../loading/loading.component";
import {
  MultiSelectSelectedOptionsComponent
} from "./multi-select-selected-options/multi-select-selected-options.component";

@Component({
  selector: 'app-multi-select',
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    LoadingComponent,
    MultiSelectSelectedOptionsComponent,
  ],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.css'
})
export class MultiSelectComponent implements OnInit, OnChanges, AfterViewInit {
  readonly selectedOptions = input<number[]>([1, 2, 3, 4]);
  readonly optionList = input<MultiSelectOption[]>([
    {id: "1", title: "un", value: "un", description: "ceci est un chiffre, 123456789"},
    {id: "2", title: "deux", value: "deux", description: "ceci est un chiffre"},
    {id: "3", title: "trois", value: "trois", description: "ceci est un chiffre"},
    {id: "4", title: "quatrequatrequatrequatre", value: "quatre", description: "ceci est un chiffre"},
  ]);
  readonly isLoading = input<boolean>(true);
  readonly addDescriptionToTag = input<boolean>(false); // can add description to the tag
  readonly addDescriptionToOption = input<boolean>(false); // can add description to option field
  readonly limitOfDisplayedSelectedOptions = input<number>(0);

  displayedSelectedOptions = signal<MultiSelectOptionSelected[]>([]);

  @Output() onTouched = new EventEmitter<boolean>();
  @Output() onChange = new EventEmitter<number[]>();

  @ViewChild('allTagsOption') allTagsOption!: ElementRef;
  @ViewChild('selectBox') selectBox!: ElementRef;
  @ViewChild('noResultMessage') noResultMessage!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChildren('option') options!: QueryList<ElementRef>;

  ngOnInit() {
    this.updateDisplayedSelectedOptions();
  }

  ngOnChanges(): void {
    if (this.options) {
      this.resetSelectedOption();
      this.setSelectedOptionActive();
    }
    this.updateDisplayedSelectedOptions();
  }

  ngAfterViewInit() {
    this.setSelectedOptionActive();
    document.addEventListener("click", (event: MouseEvent) => {
      if (!(event.target instanceof HTMLElement)) return
      if (
        !event.target.closest(".custom-select")
        && !event.target.classList.contains("remove-tag")
        && !event.target.classList.contains("fa-close")
      ) {
        this.selectBox.nativeElement.parentNode.classList.remove("open");
      }
    });
  }

  resetSelectedOption(): void {
    this.options.forEach((option: ElementRef) => option.nativeElement.classList.remove("active"));
  }

  setSelectedOptionActive(): void {
    let allTagsUsed = true;
    this.options.forEach((option: ElementRef) => {
      if (!option.nativeElement.classList.contains("all-tags")) {
        let isSelected: string | undefined = this.selectedOptions().find((id: number) =>
          id.toString() === option.nativeElement.getAttribute("data-value"))?.toString();
        if (isSelected)
          option.nativeElement.classList.toggle("active");
        else
          allTagsUsed = false;
      }
    });
    if (allTagsUsed && this.options.length > 1)
      this.allTagsOption.nativeElement.classList.toggle("active");
  }

  optionSelectedToDisplayed(): MultiSelectOptionSelected[] {
    return this.selectedOptions().map((id: number) => {
      let option: MultiSelectOption | undefined = this.optionList().find(opt => opt.id.toString() === id.toString())
      return {
        id: id.toString(),
        title: option ? option.title : ""
      }
    });
  }

  updateDisplayedSelectedOptions(): void {
    const limitOfDisplayedSelectedOptions = this.limitOfDisplayedSelectedOptions();
    if (limitOfDisplayedSelectedOptions === 0) {
      this.displayedSelectedOptions.set(this.optionSelectedToDisplayed());
    } else {
      let length: number = this.selectedOptions().length;
      this.displayedSelectedOptions.set(this.optionSelectedToDisplayed().slice(0, limitOfDisplayedSelectedOptions));
      if (length > limitOfDisplayedSelectedOptions)
        this.displayedSelectedOptions.update(value => [...value, {
          id: "more",
          title: '+' + (length - limitOfDisplayedSelectedOptions).toString()
        }]);
    }

    if (this.addDescriptionToTag())
      this.displayedSelectedOptions().forEach((option: MultiSelectOptionSelected) => {
          let opt: MultiSelectOption | undefined =
            this.optionList().find((opt: MultiSelectOption) => option.id === opt.id);
          if (opt?.description)
            option.title += " : " + opt.description;
        }
      )
  }

  updateSelectedOptions() {
    let newSelectedOptions: any[] = Array.from(this.options)
      .filter((option: ElementRef) => option.nativeElement.classList.contains("active"))
      .filter((option: ElementRef) => !option.nativeElement.classList.contains("all-tags"))
      .map((option: ElementRef) => {
        return option.nativeElement.getAttribute("data-value");
      });
    this.onChange.emit(newSelectedOptions);
    this.onTouched.emit(true)
    this.updateDisplayedSelectedOptions()
  }

  onCLickSelect($event: MouseEvent) {
    const selectBox: EventTarget | null = $event.target
    if (!(selectBox instanceof Element)) return;
    if (!selectBox.closest(".tag")) {
      this.selectBox.nativeElement.parentNode.classList.toggle("open")
      this.onTouched.emit(true)
    }
  }

  onInputSearch() {
    const searchTerm = this.searchInput.nativeElement.value.toLowerCase();
    this.options.forEach((option: ElementRef) => {
      if (option.nativeElement.textContent) {
        const optionText = option.nativeElement.textContent.trim().toLocaleString().toLowerCase();
        const shouldShow = optionText.includes(searchTerm);
        option.nativeElement.style.display = shouldShow ? "block" : "none";
      }
    });

    const anyOptionsMatch: boolean = Array.from(this.options).some(
      (option: ElementRef) =>
        (option.nativeElement.style.display === "block")
    );
    this.noResultMessage.nativeElement.style.display =
      anyOptionsMatch ? "none" : "block";

    if (searchTerm.length !== 0)
      this.allTagsOption.nativeElement.style.display = "none";
    else
      this.allTagsOption.nativeElement.style.display = "block";
  }

  onClickClear() {
    this.searchInput.nativeElement.value = "";
    this.options.forEach((option: ElementRef) => option.nativeElement.style.display = "block");
    this.noResultMessage.nativeElement.style.display = "none";
  }

  onClickAllOption() {
    const isActive = this.allTagsOption.nativeElement.classList.contains("active");
    this.options.forEach((option: ElementRef) => {
      if (option !== this.allTagsOption.nativeElement)
        option.nativeElement.classList.toggle("active", isActive);
    });
    this.updateSelectedOptions();
  }

  onClickOption(mouseEvent: MouseEvent) {
    const option: EventTarget | null = mouseEvent.currentTarget
    if (!(option instanceof HTMLElement)) return;
    option.classList.toggle("active");
    if (option.classList.contains("all-tags"))
      this.onClickAllOption()
    this.updateSelectedOptions();
  }

  onCLickRemoveTag(mouseEvent: MouseEvent) {
    const target: EventTarget | null = mouseEvent.currentTarget
    if (!(target instanceof HTMLElement)) return;
    const removeTag: Element | null = target.closest(".remove-tag");
    if (removeTag === null) return;
    const customSelect: Element | null = removeTag.closest(".custom-select");
    const valueToRemove: string | null = removeTag.getAttribute("data-value");
    if (customSelect === null || valueToRemove === null) return;
    const optionToRemove: Element | null = customSelect.querySelector(
      ".option[data-value='" + valueToRemove + "']"
    );
    if (optionToRemove === null) return;
    optionToRemove.classList.remove("active");
    const otherSelectedOptions: NodeList =
      customSelect.querySelectorAll(".option.active:not(.all-tags)");
    if (otherSelectedOptions.length === 0)
      this.allTagsOption.nativeElement.classList.remove("active");
    this.updateSelectedOptions();
  }
}



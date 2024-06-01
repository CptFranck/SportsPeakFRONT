import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Option} from "../../../interface/multi-select/option";
import {OptionSelected} from "../../../interface/multi-select/optionSelected";

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
  ],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.css'
})
export class MultiSelectComponent implements OnInit, OnChanges, AfterViewInit {
  displayedSelectedOptions: OptionSelected[] = [];
  @Input() selectedOptions: number[] = [1, 2, 3, 4];
  @Output() onChange: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Input() optionList: Option[] = [
    {id: "1", title: "un", value: "un", description: "ceci est un chiffre, 123456789"},
    {id: "2", title: "deux", value: "deux", description: "ceci est un chiffre"},
    {id: "3", title: "trois", value: "trois", description: "ceci est un chiffre"},
    {id: "4", title: "quatrequatrequatrequatre", value: "quatre", description: "ceci est un chiffre"},
  ];
  @Input() addDescriptionToTag: boolean = false; // can add description to the tag
  @Input() addDescriptionToOption: boolean = false; // can add description to option field
  @Input() limitOfDisplayedSelectedOptions: number = 0;

  @ViewChild('allTagsOption') allTagsOption!: ElementRef;
  @ViewChild('selectBox') selectBox!: ElementRef;
  @ViewChild('noResultMessage') noResultMessage!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChildren('option') options!: QueryList<ElementRef>;

  @Output() onTouched = new EventEmitter<boolean>();

  ngOnInit() {
    this.updateDisplayedSelectedOptions()
  }

  ngOnChanges(): void {
    this.updateDisplayedSelectedOptions()
  }

  ngAfterViewInit() {
    this.setSelectedOptionActive()
    this.options.changes.subscribe(() =>
      this.setSelectedOptionActive()
    );

    document.addEventListener("click", (event) => {
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

  setSelectedOptionActive(): void {
    let allTagsUsed = true;
    this.options.forEach((option) => {
      if (!option.nativeElement.classList.contains("all-tags")) {
        let isSelected =
          this.selectedOptions.find(id =>
            id.toString() === option.nativeElement.getAttribute("data-value"))?.toString()
        if (isSelected) {
          option.nativeElement.classList.toggle("active")
        } else {
          allTagsUsed = false
        }
      }
    });

    if (allTagsUsed && this.options.length > 1) {
      this.allTagsOption.nativeElement.classList.toggle("active");
    }
  }

  optionSelectedToDisplayed(): OptionSelected[] {
    return this.selectedOptions.map(id => {
      let option = this.optionList.find(opt => {
        return opt.id.toString() === id.toString()
      })
      return {id: id.toString(), title: option ? option.title : ""}
    });
  }

  updateDisplayedSelectedOptions(): void {
    if (this.limitOfDisplayedSelectedOptions === 0) {
      this.displayedSelectedOptions = this.optionSelectedToDisplayed()
    } else {
      let length = this.selectedOptions.length;
      this.displayedSelectedOptions = this.optionSelectedToDisplayed().slice(0, this.limitOfDisplayedSelectedOptions);
      if (length > this.limitOfDisplayedSelectedOptions)
        this.displayedSelectedOptions.push({
          id: "more",
          title: '+' + (length - this.limitOfDisplayedSelectedOptions).toString()
        });
    }

    if (this.addDescriptionToTag)
      this.displayedSelectedOptions.forEach(option => {
          let opt = this.optionList
            .find(opt => option.id === opt.id);
          if (opt && opt.description)
            option.title += " : " + opt.description;
        }
      )
  }

  updateSelectedOptions() {
    let newSelectedOptions = Array.from(this.options)
      .filter((option) => option.nativeElement.classList.contains("active"))
      .filter((option) => !option.nativeElement.classList.contains("all-tags"))
      .map((option) => {
        return option.nativeElement.getAttribute("data-value");
      });
    this.selectedOptions = newSelectedOptions
    this.onChange.emit(newSelectedOptions);
    this.onTouched.emit(true)
    this.updateDisplayedSelectedOptions()
  }

  onCLickSelect($event: MouseEvent) {
    const selectBox = $event.target
    if (!(selectBox instanceof Element)) return;
    if (!selectBox.closest(".tag")) {
      this.selectBox.nativeElement.parentNode.classList.toggle("open")
      this.onTouched.emit(true)
    }
  }

  onInputSearch() {
    const searchTerm = this.searchInput.nativeElement.value.toLowerCase();
    this.options.forEach((option) => {
      if (option.nativeElement.textContent) {
        const optionText = option.nativeElement.textContent.trim().toLocaleString().toLowerCase();
        const shouldShow = optionText.includes(searchTerm);
        option.nativeElement.style.display = shouldShow ? "block" : "none";
      }
    });

    const anyOptionsMatch = Array.from(this.options).some(
      (option) =>
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
    this.options.forEach((option) => {
      option.nativeElement.style.display = "block";
    });
    this.noResultMessage.nativeElement.style.display = "none";
  }

  onClickAllOption() {
    const isActive = this.allTagsOption.nativeElement.classList.contains("active");
    this.options.forEach((option) => {
      if (option !== this.allTagsOption.nativeElement)
        option.nativeElement.classList.toggle("active", isActive);
    });
    this.updateSelectedOptions();
  }

  onClickOption(mouseEvent: MouseEvent) {
    const option = mouseEvent.currentTarget
    if (!(option instanceof HTMLElement)) return;
    option.classList.toggle("active");
    if (option.classList.contains("all-tags"))
      this.onClickAllOption()
    this.updateSelectedOptions();
  }

  onCLickRemoveTag(mouseEvent: MouseEvent) {
    const target = mouseEvent.currentTarget
    if (!(target instanceof HTMLElement)) return;
    const removeTag = target.closest(".remove-tag");
    if (removeTag === null) return;
    const customSelect = removeTag.closest(".custom-select");
    const valueToRemove = removeTag.getAttribute("data-value");
    if (customSelect === null || valueToRemove === null) return;
    const optionToRemove = customSelect.querySelector(
      ".option[data-value='" + valueToRemove + "']"
    );
    if (optionToRemove === null) return;
    optionToRemove.classList.remove("active");
    const otherSelectedOptions =
      customSelect.querySelectorAll(".option.active:not(.all-tags)");
    if (otherSelectedOptions.length === 0)
      this.allTagsOption.nativeElement.classList.remove("active");
    this.updateSelectedOptions();
  }
}



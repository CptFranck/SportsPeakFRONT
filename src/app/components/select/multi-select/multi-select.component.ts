import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Option} from "../../../interface/multiSelect/option";
import {OptionSelected} from "../../../interface/multiSelect/optionSelected";

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
export class MultiSelectComponent implements OnInit, AfterViewInit {
  @Input()
  listOptions: Option[] =
    // []
    [
      {id: "1", title: "un", value: "un"},
      {id: "2", title: "deux", value: "deux"},
      {id: "3", title: "trois", value: "trois"},
      {id: "4", title: "quatrequatrequatrequatrequatre", value: "quatre"},
      {id: "5", title: "cinq", value: "cinq"},
      {id: "6", title: "six", value: "six"},
      {id: "7", title: "sept", value: "sept"},
      {id: "8", title: "huit", value: "huit"},
    ];
  @Input()
  selectedOptions: OptionSelected[] =
    // []
    [
      {id: "1", title: "un"},
      {id: "2", title: "deux"},
      {id: "3", title: "trois"},
      {id: "4", title: "quatrequatrequatrequatrequatre"},
      {id: "5", title: "cinq"},
      {id: "6", title: "six"},
      {id: "7", title: "sept"},
      {id: "8", title: "huit"}
    ];

  displayedSelectedOptions: OptionSelected[] = [];

  @Input()
  limitOfDisplayedSelectedOptions: number = 0;

  @Input()
  showLog: boolean = false;

  // @ViewChild('allTagsOption') allTags!: ElementRef;
  @ViewChild('allTagsOption') allTagsOption!: ElementRef;

  readonly customSelect: HTMLElement;
  selectBox: HTMLElement | null = null;
  searchInput: HTMLElement | null = null;
  optionsContainer: HTMLElement | null = null;
  options: NodeListOf<HTMLElement> | null = null;
  // allTagsOption: HTMLElement | null = null;
  noResultMessage: HTMLElement | null = null;

  constructor(private elem: ElementRef) {
    this.customSelect = this.elem.nativeElement;
  }

  ngOnInit(): void {
    this.updateDisplayedSelectedOptions()
  }

  ngAfterViewInit() {
    this.selectBox = this.customSelect.querySelector(".select-box");
    this.searchInput = this.customSelect.querySelector(".search-tags");
    this.optionsContainer = this.customSelect.querySelector(".options");
    this.options = this.customSelect.querySelectorAll('.option');
    // this.allTagsOption = this.customSelect.querySelector(".option.all-tags");
    // this.allTagsOption = this.allTags.nativeElement;
    this.noResultMessage = this.customSelect.querySelector(".no-result-message");

    let allTagsUsed = true;
    if (!this.options) {
      return;
    }
    this.options.forEach((opt) => {
      if (!opt.classList.contains("all-tags")) {
        if (this.selectedOptions.find(so =>
          so.id === opt.getAttribute("data-value"))) {
          opt.classList.toggle("active")
        } else {
          allTagsUsed = false
        }
      }
    })

    if (allTagsUsed) {
      this.allTagsOption.nativeElement.classList.toggle("active");
    }

    document.addEventListener("click", (event) => {
      if (!(event.target instanceof HTMLElement)) {
        return;
      }
      if (
        !event.target.closest(".custom-select")
        && !event.target.classList.contains("remove-tag")
        && !event.target.classList.contains("fa-close")
        && this.selectBox?.parentNode instanceof HTMLElement
      ) {
        this.selectBox.parentNode.classList.remove("open");
      }
    });
  }

  updateDisplayedSelectedOptions(): void {
    if (this.limitOfDisplayedSelectedOptions === 0) {
      this.displayedSelectedOptions = [...this.selectedOptions];
    } else {
      let length = this.selectedOptions.length;
      this.displayedSelectedOptions = [...this.selectedOptions].slice(0, this.limitOfDisplayedSelectedOptions);
      if (length > this.limitOfDisplayedSelectedOptions) {
        this.displayedSelectedOptions.push({
          id: "more",
          title: '+' + (length - this.limitOfDisplayedSelectedOptions).toString()
        });
      }
    }
  }

  updateSelectedOptions() {
    if (this.showLog)
      console.log(this.options)

    if (!this.options) {
      return
    }
    this.selectedOptions = Array.from(this.options)
      .filter((option) => option.classList.contains("active"))
      .filter((option) => !option.classList.contains("all-tags"))
      .map((option: any) => {
        return {
          id: option.getAttribute("data-value"),
          title: option.textContent === null ? "" : option.textContent.trim(),
        };
      });

    this.updateDisplayedSelectedOptions()
  }

  onCLickSelect($event: MouseEvent) {
    const selectBox = $event.target
    if (!(selectBox instanceof Element)) {
      return;
    }
    if (!selectBox.closest(".tag") &&
      this.selectBox?.parentNode instanceof Element
    ) {
      this.selectBox.parentNode.classList.toggle("open");
    }
  }

  onInputSearch() {
    if (!(this.searchInput instanceof HTMLInputElement)
      || !(this.options instanceof NodeList)
      || !(this.optionsContainer instanceof HTMLElement)
      || !(this.allTagsOption instanceof HTMLElement)
      || !(this.noResultMessage instanceof HTMLElement)
    ) {
      return
    }
    const searchTerm = this.searchInput.value.toLowerCase();
    this.options.forEach((option) => {
      if (option.textContent) {
        const optionText = option.textContent.trim().toLocaleString().toLowerCase();
        const shouldShow = optionText.includes(searchTerm);
        (option as HTMLElement).style.display = shouldShow ? "block" : "none";
      }
    });

    const anyOptionsMatch = Array.from(this.options).some(
      (option) => ((option as HTMLElement).style.display === "block")
    );
    this.noResultMessage.style.display = anyOptionsMatch ? "none" : "block";

    if (searchTerm) {
      this.optionsContainer.classList.add("option-search-active");
    } else {
      this.optionsContainer.classList.remove("option-search-active");
    }

    if (searchTerm.length !== 0) {
      this.allTagsOption.style.display = "none";
    } else {
      this.allTagsOption.style.display = "block";
    }
  }

  onClickClear() {
    if (!(this.searchInput instanceof HTMLInputElement)
      || !(this.noResultMessage instanceof HTMLElement)
      || !(this.options instanceof NodeList)) {
      return
    }
    this.searchInput.value = "";
    this.options.forEach((option: HTMLElement) => {
      option.style.display = "block";
    });
    this.noResultMessage.style.display = "none";
  }

  onClickAllOption() {
    if (!(this.options instanceof NodeList)) {
      return;
    }
    const isActive = this.allTagsOption.nativeElement.classList.contains("active");
    this.options.forEach((option: HTMLElement) => {
      if (option !== this.allTagsOption.nativeElement) {
        option.classList.toggle("active", isActive);
      }
    });
    this.updateSelectedOptions();
  }

  onClickOption(mouseEvent: MouseEvent) {
    const option = mouseEvent.currentTarget
    if (option instanceof HTMLElement) {
      option.classList.toggle("active");
      if (option.classList.contains("all-tags")) {
        this.onClickAllOption()
      }
      this.updateSelectedOptions();
    }
  }

  onCLickRemoveTag(mouseEvent: MouseEvent) {
    const target = mouseEvent.currentTarget
    if (!(target instanceof HTMLElement)) {
      return
    }
    const removeTag = target.closest(".remove-tag");
    if (removeTag === null) {
      return;
    }
    const customSelect = removeTag.closest(".custom-select");
    const valueToRemove = removeTag.getAttribute("data-value");
    if (customSelect === null || valueToRemove === null) {
      return;
    }
    const optionToRemove = customSelect.querySelector(
      ".option[data-value='" + valueToRemove + "']"
    );
    if (optionToRemove === null) {
      return;
    }
    optionToRemove.classList.remove("active");
    const otherSelectedOptions = customSelect.querySelectorAll(
      ".option.active:not(.all-tags)"
    );
    if (otherSelectedOptions.length === 0) {
      this.allTagsOption.nativeElement.classList.remove("active");
    }
    this.updateSelectedOptions();
  }

  // resetCustomSelect() {
  //   this.customSelect.querySelectorAll(".option.active").forEach((option: HTMLElement) => {
  //     option.classList.remove("active");
  //   });
  //   this.customSelect.querySelector(".option.all-tags").classList.remove("active");
  //   this.updateSelectedOptions();
  // }
}



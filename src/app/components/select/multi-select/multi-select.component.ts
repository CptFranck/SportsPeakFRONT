import {AfterViewInit, Component, ElementRef, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

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
export class MultiSelectComponent implements AfterViewInit {
  listOptions: any = [
    {id: 1, value: "un"},
    {id: 2, value: "deux"},
    {id: 3, value: "trois"},
    {id: 4, value: "quatrequatrequatrequatrequatre"},
    {id: 5, value: "cinq"},
    {id: 6, value: "six"},
    {id: 7, value: "sept"},
    {id: 8, value: "huit"},
  ]
  selectedOptions: {
    value: string,
    text: string,
  }[] =
    // [];
    [
      {value: "1", text: "un"},
      {value: "2", text: "deux"},
      {value: "3", text: "trois"},
      {value: "4", text: "quatrequatrequatrequatrequatre"},
      {value: "5", text: "cinq"},
      {value: "6", text: "six"},
      {value: "7", text: "sept"},
      {value: "8", text: "huit"}
    ];

  @Input()
  limitOfDisplayedSelectedOptions: number = 0;
  displayedSelectedOptions: {
    value: string,
    text: string,
  }[] = [];

  private readonly customSelect: HTMLElement;
  private selectBox: HTMLElement | null = null;
  private searchInput: HTMLElement | null = null;
  private optionsContainer: HTMLElement | null = null;
  private options: NodeListOf<HTMLElement> | null = null;
  private allTagsOption: HTMLElement | null = null;
  private noResultMessage: HTMLElement | null = null;

  constructor(private elem: ElementRef) {
    this.customSelect = this.elem.nativeElement;

  }

  ngAfterViewInit(): void {

    this.selectBox = this.customSelect.querySelector(".select-box");
    this.searchInput = this.customSelect.querySelector(".search-tags");
    this.optionsContainer = this.customSelect.querySelector(".options");
    this.options = this.customSelect.querySelectorAll('.option');
    this.allTagsOption = this.customSelect.querySelector(".option.all-tags");
    this.noResultMessage = this.customSelect.querySelector(".no-result-message");

    let allTagsUsed = true;
    this.options.forEach((opt) => {
      if (!opt.classList.contains("all-tags")) {
        if (this.selectedOptions.find(so =>
          so.value === opt.getAttribute("data-value"))) {
          opt.classList.toggle("active")
        } else {
          allTagsUsed = false
        }
      }
    })

    if (allTagsUsed && this.allTagsOption) {
      this.allTagsOption.classList.toggle("active");
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

    this.updateDisplayedSelectedOptions()
  }

  updateDisplayedSelectedOptions(): void {
    if (this.limitOfDisplayedSelectedOptions === 0) {
      this.displayedSelectedOptions = [...this.selectedOptions];
    } else {
      let length = this.selectedOptions.length;
      this.displayedSelectedOptions = [...this.selectedOptions].slice(0, this.limitOfDisplayedSelectedOptions);
      if (length > this.limitOfDisplayedSelectedOptions) {
        this.displayedSelectedOptions.push({
          value: "more",
          text: '+' + (length - this.limitOfDisplayedSelectedOptions).toString()
        });
      }
    }
  }

  updateSelectedOptions() {
    if (!this.options) {
      return
    }
    this.selectedOptions = Array.from(this.options)
      .filter((option) => option.classList.contains("active"))
      .filter((option) => !option.classList.contains("all-tags"))
      .map((option: any) => {
        return {
          value: option.getAttribute("data-value"),
          text: option.textContent === null ? "" : option.textContent.trim(),
        };
      });

    this.updateDisplayedSelectedOptions()
  }

  onCLickSelect($event: MouseEvent) {
    const selectBox = $event.target
    if (!(selectBox instanceof Element)) {
      return;
    }

    console.log(!selectBox.closest(".tag"))
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
    if (!(this.allTagsOption instanceof HTMLElement)
      || !(this.options instanceof NodeList)) {
      return;
    }
    const isActive = this.allTagsOption.classList.contains("active");
    this.options.forEach((option: HTMLElement) => {
      if (option !== this.allTagsOption) {
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
    if (otherSelectedOptions.length === 0 && this.allTagsOption) {
      this.allTagsOption.classList.remove("active");
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



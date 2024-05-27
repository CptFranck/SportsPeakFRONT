import {AfterViewInit, Component, ElementRef} from '@angular/core';
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
    {id: 4, value: "quatre"},
    {id: 5, value: "cinq"},
    {id: 6, value: "six"},
    {id: 7, value: "sept"},
    {id: 8, value: "huit"},
  ]
  selectedOptions: {
    value: string,
    text: string,
  }[] = []
  // [
  //   {value: "1", text: "un"},
  //   {value: "2", text: "deux"},
  //   {value: "3", text: "trois"},
  //   {value: "4", text: "quatre"},
  //   {value: "5", text: "cinq"},
  //   {value: "6", text: "six"},
  //   {value: "7", text: "sept"},
  //   {value: "8", text: "huit"}
  // ];

  // displayedSelectedOptions: {
  //   value: string,
  //   text: string,
  // }[] = [];
  private customSelect: any;
  private searchInput: any;
  private optionsContainer: any;
  private options: any;
  private allTagsOption: any;
  private noResultMessage: any;
  private selectBox: any;

  constructor(private elem: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.customSelect = this.elem.nativeElement;
    this.selectBox = this.customSelect.querySelector(".select-box");
    this.searchInput = this.customSelect.querySelector(".search-tags");
    this.optionsContainer = this.customSelect.querySelector(".options");
    this.options = this.customSelect.querySelectorAll('.option');
    this.allTagsOption = this.customSelect.querySelector(".option.all-tags");
    this.noResultMessage = this.customSelect.querySelector(".no-result-message");

    let allTagsUsed = true;
    this.options.forEach((opt: Element) => {
      if (!opt.classList.contains("all-tags")) {
        if (this.selectedOptions.find(so =>
          so.value === opt.getAttribute("data-value"))) {
          opt.classList.toggle("active")
        } else {
          allTagsUsed = false
        }
      }
    })
    if (allTagsUsed) {
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
      ) {
        this.selectBox.parentNode.classList.remove("open");
      }
    });
  }

  updateSelectedOptions() {
    this.selectedOptions = Array.from(this.options)
      .filter((option) => (option as HTMLElement).classList.contains("active"))
      .filter((option) => !(option as HTMLElement).classList.contains("all-tags"))
      .map((option: any) => {
        return {
          value: option.getAttribute("data-value"),
          text: option.textContent === null ? "" : option.textContent.trim(),
        };
      });
    console.log(this.selectedOptions)
  }

  onCLickSelect($event: MouseEvent) {
    const selectBox = $event.target
    if (!(selectBox instanceof Element)) {
      return;
    }

    console.log(!selectBox.closest(".tag"))
    if (!selectBox.closest(".tag")) {
      this.selectBox.parentNode.classList.toggle("open");
    }
  }

  onInputSearch() {
    const searchTerm = this.searchInput.value.toLowerCase();
    this.options.forEach((option: HTMLElement) => {
      if (option.textContent) {
        const optionText = option.textContent.trim().toLocaleString().toLowerCase();
        const shouldShow = optionText.includes(searchTerm);
        option.style.display = shouldShow ? "block" : "none";
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
    this.searchInput.value = "";
    this.options.forEach((option: HTMLElement) => {
      option.style.display = "block";
    });
    this.noResultMessage.style.display = "none";
  }

  onClickAllOption() {
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
    if (otherSelectedOptions.length === 0) {
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



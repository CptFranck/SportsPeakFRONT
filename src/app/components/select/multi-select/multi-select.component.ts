import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
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

  @ViewChild('allTagsOption') allTagsOption!: ElementRef;
  @ViewChild('selectBox') selectBox!: ElementRef;
  @ViewChild('noResultMessage') noResultMessage!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChildren('option') options!: QueryList<ElementRef>;
  readonly customSelect: HTMLElement;

  constructor(private elem: ElementRef) {
    this.customSelect = this.elem.nativeElement;
  }

  ngOnInit(): void {
    this.updateDisplayedSelectedOptions()
  }

  ngAfterViewInit() {
    let allTagsUsed = true;
    if (!this.options) {
      return;
    }
    this.options.forEach((opt) => {
      if (!opt.nativeElement.classList.contains("all-tags")) {
        if (this.selectedOptions.find(so =>
          so.id === opt.nativeElement.getAttribute("data-value"))) {
          opt.nativeElement.classList.toggle("active")
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
      ) {
        this.selectBox.nativeElement.parentNode.classList.remove("open");
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
    this.selectedOptions = Array.from(this.options)
      .filter((option) => option.nativeElement.classList.contains("active"))
      .filter((option) => !option.nativeElement.classList.contains("all-tags"))
      .map((option) => {
        return {
          id: option.nativeElement.getAttribute("data-value"),
          title: option.nativeElement.textContent === null ? "" : option.nativeElement.textContent.trim(),
        };
      });

    this.updateDisplayedSelectedOptions()
  }

  onCLickSelect($event: MouseEvent) {
    const selectBox = $event.target
    if (!(selectBox instanceof Element)) {
      return;
    }
    if (!selectBox.closest(".tag")) {
      this.selectBox.nativeElement.parentNode.classList.toggle("open");
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

    if (searchTerm.length !== 0) {
      this.allTagsOption.nativeElement.style.display = "none";
    } else {
      this.allTagsOption.nativeElement.style.display = "block";
    }
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
      if (option !== this.allTagsOption.nativeElement) {
        option.nativeElement.classList.toggle("active", isActive);
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
    const otherSelectedOptions =
      customSelect.querySelectorAll(".option.active:not(.all-tags)");
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



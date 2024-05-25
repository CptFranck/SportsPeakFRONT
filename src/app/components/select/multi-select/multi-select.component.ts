import {Component, ElementRef, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
  ],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.css'
})
export class MultiSelectComponent implements OnInit {
  list: any = [
    {id: 1, value: "un"},
    {id: 2, value: "deux"},
    {id: 3, value: "trois"},
    {id: 4, value: "quatre"},
  ]
  selectedDevice: any = 1;
  selectedDevices: any = [...this.list];

  private searchInput: any;
  private optionsContainer: any;
  private options: any;
  private allTagsOption: any;
  private noResultMessage: any;


  constructor(private elem: ElementRef) {
  }

  ngOnInit(): void {
    this.searchInput = this.elem.nativeElement.querySelector(".search-tags");
    this.optionsContainer = this.elem.nativeElement.querySelector(".options");
    this.options = this.elem.nativeElement.querySelectorAll('.option');
    this.allTagsOption = this.elem.nativeElement.querySelector(".option.all-tags");
    this.noResultMessage = this.elem.nativeElement.querySelector(".no-result-message");

  }

  ///////////////////////
  //
  // onSelect(id: string) {
  //   let idBis = parseInt(id)
  //   let obj = this.list.find((e: any) => e.id === idBis)
  //   if (!this.selectedDevices.some((e: any) => e.id === idBis)) {
  //     console.log(obj)
  //     this.selectedDevices.push(obj)
  //   }
  // }
  //
  // delete(id: number) {
  //   this.selectedDevices = this.selectedDevices.filter((item: { id: number; }) => item.id !== id);
  // }
  ///////////////////////

  onCLickSelect($event: MouseEvent) {
    const selectBox = $event.currentTarget
    if (!(selectBox instanceof Element)) {
      return;
    }
    if (!selectBox.closest(".tag")) {
      if (selectBox.parentNode === null) {
        return;
      }
      if (!(selectBox.parentNode instanceof Element)) {
        return;
      }
      selectBox.parentNode.classList.toggle("open");
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
      ////???????????????????????
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
        option.classList.toggle("active", !isActive);
      }
    });
    this.updateSelectedOptions();
  }

  onClickOption(mouseEvent: MouseEvent) {
    const option = mouseEvent.currentTarget
    if (option instanceof HTMLElement) {
      option.classList.toggle("active");
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

  resetCustomSelect() {
    const customSelect = this.elem.nativeElement;
    customSelect.querySelectorAll(".option.active").forEach((option: HTMLElement) => {
      option.classList.remove("active");
    });
    customSelect.querySelector(".option.all-tags").classList.remove("active");
    this.updateSelectedOptions();
  }

  updateSelectedOptions() {
    const customSelect = this.elem.nativeElement;
    const selectedOptions = Array.from(
      customSelect.querySelectorAll(".option.active")
    )
      .filter(
        (option) => option !== customSelect.querySelector(".option.all-tags")
      )
      .map((option: any) => {
        return {
          value: option.getAttribute("data-value"),
          text: option.textContent === null ? "" : option.textContent.trim(),
        };
      });

    const selectedValues = selectedOptions.map((option) => {
      return option.value;
    });

    const tagsInput = customSelect.querySelector(".tags_input")
    if (tagsInput === null || !(tagsInput instanceof HTMLInputElement)) {
      return;
    }
    tagsInput.value = selectedValues.join(", ");

    let tagsHTML = "";

    if (selectedValues.length === 0) {
      tagsHTML = '<span class="placeholder">Select tags</span>';
    } else {
      const maxTagsToShow = 4;
      let additionalTagsCount = 0;

      selectedOptions.forEach((option, index) => {
        if (index < maxTagsToShow) {
          tagsHTML +=
            '<span class="tag">' +
            option.text +
            '<span class="remove-tag" data-value="' +
            option.value +
            '"><i class="fa fa-close"></i></span>' +
            "</span>";
        } else {
          additionalTagsCount++;
        }
      });

      if (additionalTagsCount > 0) {
        tagsHTML += '<span class="tag">+' + additionalTagsCount + "</span>";
      }
    }
    this.elem.nativeElement.querySelector(".selected-options").innerHTML = tagsHTML;
  }
}



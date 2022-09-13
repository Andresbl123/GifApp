import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  constructor(private gifServece: GifsService) {}

  @ViewChild('textSearch') textInput!: ElementRef<HTMLInputElement>;

  search() {
    const value = this.textInput.nativeElement.value;
    if (value.trim().length == 0) {
      return;
    }
    this.gifServece.searchHistory(value);
    this.textInput.nativeElement.value = '';
  }
}

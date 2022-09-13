import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  constructor(private http: HttpClient) {}

  private apiKey: string = 'sjhRnCwjcLlCcrJGfh112GrMuHrh36vJ';
  private limitDataApi: number = 10;
  result: any[] = [];

  private _history: string[] = [];

  get history() {
    return [...this._history];
  }

  searchHistory(query: string = '') {
    query = query.trim().toLowerCase();
    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.slice(0, 10);
    }

    console.log(this._history);

    this.http
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`
      )
      .subscribe((resp: any) => {
        console.log(resp, 'andres');
        this.result = resp.data;
      });
  }
}

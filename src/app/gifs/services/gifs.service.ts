import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  constructor(private http: HttpClient) {
    this._history = JSON.parse(sessionStorage.getItem('historial')!) || [];
    this.result = JSON.parse(sessionStorage.getItem('gif')!) || [];
  }

  private apiKey: string = 'sjhRnCwjcLlCcrJGfh112GrMuHrh36vJ';
  private constUrl: string = 'https://api.giphy.com/v1/gifs';
  result: Gif[] = [];

  private _history: string[] = [];

  get history() {
    return [...this._history];
  }

  searchHistory(query: string = '') {
    query = query.trim().toLowerCase();
    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.slice(0, 10);
      sessionStorage.setItem('historial', JSON.stringify(this._history));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGIFResponse>(`${this.constUrl}/search`, { params })
      .subscribe((resp: any) => {
        this.result = resp.data;
        sessionStorage.setItem('gif', JSON.stringify(this.result));
      });
  }
}

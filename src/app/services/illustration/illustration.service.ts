import {Injectable} from '@angular/core';
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class IllustrationService {

  private readonly API_BASE_URL = environment.apiBaseUrl;

  getImageUrl(relativePath: string): string {
    if (!relativePath) return '';
    return this.API_BASE_URL + relativePath;
  }
}

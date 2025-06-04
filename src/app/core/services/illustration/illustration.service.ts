import {inject, Injectable} from '@angular/core';
import {environment} from "../../environment";
import {FormGroup} from "@angular/forms";
import {AlertService} from "../alert/alert.service";
import {TokenService} from "../token/token.service";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IllustrationService {
  private refreshSubject = new Subject<string>();

  private readonly http = inject(HttpClient);
  private readonly alertService = inject(AlertService);
  private readonly tokenService = inject(TokenService)
  private readonly API_BASE_URL = environment.apiHttpBaseUrl + environment.restEndPoint;

  refreshData() {
    return this.refreshSubject.asObservable();
  }

  getImageUrl(relativePath: string): string {
    if (!relativePath) return '';
    return this.API_BASE_URL + relativePath;
  }

// eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBzcG9ydHNwZWFrLmNvbSIsImlhdCI6MTc0OTAzMDMyNiwiZXhwIjoxNzQ5MDMzOTI2fQ.56DYTr_aHJZfb8pEaywbHaaUaRveCpogo_-PNMRAZh0
  postImageUrl(formGroup: FormGroup): void {
    let id: number = formGroup.get('id')?.value;
    let type: string = formGroup.get('type')?.value;
    let file: File = formGroup.get('file')?.value;

    if (!id || !type || !file) {
      console.error('Formulaire incomplet : id, type ou fichier manquant');
      return;
    }
    const url = `${this.API_BASE_URL}/illustrations/upload/${type}/${id}`;
    const formData = new FormData();
    formData.append('file', file);

    const token = this.tokenService.getCurrentToken()?.accessToken;

    if (!token) {
      console.error('Token JWT manquant');
      return;
    }

    this.http.post<{ url: string }>(url, formData, {
      headers: {
        'Authorization': `Bearer ${this.tokenService.getCurrentToken()?.accessToken}`
      }
    }).subscribe({
      next: (res) => {
        console.log('Image envoyée avec succès', res)
        this.refreshSubject.next(res.url)
      },
      error: (err) => console.error('Erreur à l’envoi de l’image :', err)
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { IAppConfig } from './config/iapp-config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static settings: IAppConfig;
  constructor(private http: HttpClient) { }

  load() {
    //const jsonFile = `assets/config/app-config.${environment.name}.json`;
    const jsonFile = `assets/config/app-config-prod.json`;
    return new Promise<void>((resolve, reject) => {
      this.http.get(jsonFile).toPromise().then((response: IAppConfig) => {
        ConfigService.settings = <IAppConfig>response;
        resolve();
      }).catch((response: any) => {
        reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
  }
}

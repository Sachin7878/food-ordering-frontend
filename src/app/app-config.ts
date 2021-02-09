import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface Config {
  url: string;
}
export interface IAppConfig {
  baseUrl: string;
  load: () => Promise<void>;
}
@Injectable()
export class AppConfig implements IAppConfig {
  public baseUrl: string;
  constructor(private readonly http: HttpClient) {}
  public load(): Promise<void> {
    return this.http
      .get<Config>('assets/config.json')
      .toPromise()
      .then((config) => {
        this.baseUrl = config.url;
      });
  }
}
export function initConfig(config: AppConfig): () => Promise<void> {
  return () => config.load();
}

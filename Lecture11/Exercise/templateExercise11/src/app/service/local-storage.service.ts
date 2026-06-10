import { Injectable } from '@angular/core';

export interface LocalSettings {
  username?: string;
  password?: string;
  knownUserIds?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  saveLoginData(username: string, password: string) {
    const settings = this.getLoginData();
    settings.username = username;
    settings.password = password;
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  getLoginData(): LocalSettings {
    const data = localStorage.getItem('settings');
    if (!data) return {};
    return JSON.parse(data);
  }

  clearLoginData() {
    localStorage.removeItem('settings');
  }

  addKnownUserId(userId: string) {
    const settings = this.getLoginData();
    settings.knownUserIds = settings.knownUserIds || [];
    if (!settings.knownUserIds.includes(userId)) {
      settings.knownUserIds.push(userId);
    }
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  getKnownUserIds(): string[] {
    const settings = this.getLoginData();
    return settings.knownUserIds || [];
  }
}

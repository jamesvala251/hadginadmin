import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'findLanguageFromKey' })
export class FindLanguageFromKeyPipe implements PipeTransform {
  private languages: { [key: string]: { name: string; rtl?: boolean } } = {
    'ar-ly': { name: 'العربية', rtl: true },
    'zh-cn': { name: '中文（简体）' },
    'zh-tw': { name: '繁體中文' },
    en: { name: 'English' },
    fr: { name: 'Français' },
    de: { name: 'Deutsch' },
    el: { name: 'Ελληνικά' },
    hi: { name: 'हिंदी' },
    it: { name: 'Italiano' },
    ja: { name: '日本語' },
    ko: { name: '한국어' },
    pl: { name: 'Polski' },
    ru: { name: 'Русский' },
    es: { name: 'Español' },
    tr: { name: 'Türkçe' },
    th: { name: 'ไทย' },
    vi: { name: 'Tiếng Việt' },
    // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
  };

  transform(lang: string): string {
    return this.languages[lang].name;
  }

  isRTL(lang: string): boolean {
    return Boolean(this.languages[lang].rtl);
  }
}

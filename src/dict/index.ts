// https://nextjs.org/docs/app/building-your-application/routing/internationalization#localization

import { type Locale } from '@/middleware'
import 'server-only'

const dictionaries = {
  ko: async () => await import('./ko.json').then((module) => module.default),
  en: async () => await import('./en.json').then((module) => module.default),
}

export async function getTranslation(locale: Locale) {
  return await dictionaries[locale]()
}

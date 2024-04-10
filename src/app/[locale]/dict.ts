// https://nextjs.org/docs/app/building-your-application/routing/internationalization#localization

import { type Locale } from '@/middleware'
import 'server-only'

const dictionaries = {
  ko: async () => await import('../../../src/dict/ko.json').then((module) => module.default),
  en: async () => await import('../../../src/dict/en.json').then((module) => module.default),
}

export async function getDict(locale: Locale) {
  return await dictionaries[locale]()
}

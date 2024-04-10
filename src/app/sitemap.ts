import { type MetadataRoute } from 'next'

import { CANONICAL_URL } from '@/common/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: CANONICAL_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.1,
    },
    {
      url: CANONICAL_URL + '/coin/KRW-BTC',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]
}

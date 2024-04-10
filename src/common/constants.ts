// 자동
export const NODE_ENV = process.env.NODE_ENV
export const NEXT_PUBLIC_VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL ?? ''
const NEXT_PUBLIC_VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV ?? ''

// 환경 공통
export const PROJECT_ENV = process.env.PROJECT_ENV ?? ''

// 환경 개별
export const NEXT_PUBLIC_GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? ''
export const NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY =
  process.env.NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY ?? ''

// 상수
export const APPLICATION_NAME = '가즈아 - 암호화폐 코인 모의 투자'
export const APPLICATION_SHORT_NAME = '가즈아'
export const DESCRIPTION =
  '가즈아는 암호화폐 코인 모의 투자 서비스입니다. 암호화폐 시장의 실시간 가격을 확인하고, 모의 투자를 통해 수익을 내보세요.'
export const KEYWORDS = `${APPLICATION_SHORT_NAME},암호화폐,코인,모의,투자` // 최대 10개
export const CATEGORY = '코인'
export const AUTHOR = ''
export const THEME_COLOR = '#1E9EFF'
export const CANONICAL_URL =
  NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://crypto-paper-trading.vercel.app'
    : NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000'

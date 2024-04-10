// 자동
export const NODE_ENV = process.env.NODE_ENV
export const NEXT_PUBLIC_VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL as string
const NEXT_PUBLIC_VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV as string

// 환경 공통
export const PROJECT_ENV = process.env.PROJECT_ENV as string

// 상수
export const APPLICATION_NAME = '리디 RIDI - 웹툰 웹소설 만화 전자책'
export const APPLICATION_SHORT_NAME = '리디'
export const DESCRIPTION =
  '웹툰, 웹소설, 만화, 전자책 모두 리디에서 만나 보세요! 리디 독점, 할인, 무료감상 등 리디만의 특별한 혜택과 함께 다양한 이야기를 마음껏 즐기세요.'
export const KEYWORDS = `${APPLICATION_SHORT_NAME},RIDI` // 최대 10개
export const CATEGORY = '리디'
export const AUTHOR = ''
export const THEME_COLOR = '#1E9EFF'
export const CANONICAL_URL =
  NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://ridi2.vercel.app'
    : NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000'

export interface UpbitSocketResponse {
  type: string
  code: string
  opening_price: number
  high_price: number
  low_price: number
  trade_price: number
  prev_closing_price: number
  acc_trade_price: number
  change: string
  change_price: number
  signed_change_price: number
  change_rate: number
  signed_change_rate: number
  ask_bid: string
  trade_volume: number
  acc_trade_volume: number
  trade_date: string
  trade_time: string
  trade_timestamp: number
  acc_ask_volume: number
  acc_bid_volume: number
  highest_52_week_price: number
  highest_52_week_date: string
  lowest_52_week_price: number
  lowest_52_week_date: string
  market_state: string
  is_trading_suspended: boolean
  delisting_date: string
  market_warning: string
  timestamp: number
  acc_trade_price_24h: number
  acc_trade_volume_24h: number
  stream_type: string
}

export interface UpbitSocketSimpleResponse {
  ty: string
  cd: string
  op: number
  hp: number
  lp: number
  tp: number
  pcp: number
  atp: number
  c: string
  cp: number
  scp: number
  cr: number
  scr: number
  ab: string
  tv: number
  atv: number
  tdt: string
  ttm: string
  ttms: number
  aav: number
  abv: number
  h52wp: number
  h52wdt: string
  l52wp: number
  l52wdt: string
  ms: string
  its: boolean
  dd: string
  mw: string
  tms: number
  atp24h: number
  atv24h: number
  st: string
}

export interface MarketCode {
  market: string
  korean_name: string
  english_name: string
  market_warning?: 'NONE' | 'CAUTION'
}

export interface CoinCandle {
  market: string
  candle_date_time_utc: string
  candle_date_time_kst: string
  opening_price: number
  high_price: number
  low_price: number
  trade_price: number
  timestamp: number
  candle_acc_trade_price: number
  candle_acc_trade_volume: number
  unit: number
}

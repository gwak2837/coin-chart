interface Props {
  checked: boolean
  className?: string
}

export default function CheckboxIcon({ checked, className }: Props) {
  return (
    <svg className={className} fill="none" height="22" viewBox="0 0 22 22" width="22">
      {checked ? (
        <>
          <rect fill="#1E9EFF" height="22" rx="11" width="22" />
          <path
            d="M6.75 10.5L9.93198 13.682L15.2353 8.37868"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.4"
          />
        </>
      ) : (
        <circle cx="11" cy="11" r="10.5" stroke="#C1C1C1" />
      )}
    </svg>
  )
}

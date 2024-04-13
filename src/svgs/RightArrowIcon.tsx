interface Props {
  className?: string
}

export default function RightArrowIcon({ className = '' }: Props) {
  return (
    <svg className={className} height="10" viewBox="5 1 3 13" width="10">
      <path
        d="M4.06796 12.94C3.83364 12.7057 3.83364 12.3258 4.06796 12.0915L8.66036 7.49906L4.06796 2.90665C3.83364 2.67234 3.83364 2.29244 4.06796 2.05812C4.30227 1.82381 4.68217 1.82381 4.91648 2.05812L9.93315 7.07479C10.1675 7.30911 10.1675 7.68901 9.93315 7.92332L4.91648 12.94C4.68217 13.1743 4.30227 13.1743 4.06796 12.94Z"
        fill="#141414"
      />
    </svg>
  )
}

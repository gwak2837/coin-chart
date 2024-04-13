interface Props {
  className?: string
}

export default function DownArrowIcon({ className = '' }: Props) {
  return (
    <svg
      className={['fill-black dark:fill-[#787878]', className].join(' ')}
      height="7"
      viewBox="0 0 12 7"
      width="12"
    >
      <path
        d="M0.699189 0.709182C0.855398 0.552972 1.10866 0.552972 1.26487 0.709182L5.9987 5.44301L10.7325 0.709182C10.8887 0.552973 11.142 0.552973 11.2982 0.709182C11.4544 0.865392 11.4544 1.11866 11.2982 1.27487L6.28154 6.29153C6.12533 6.44774 5.87207 6.44774 5.71586 6.29153L0.699189 1.27487C0.542979 1.11866 0.542979 0.865392 0.699189 0.709182Z"
        fill="#787878"
      />
    </svg>
  )
}

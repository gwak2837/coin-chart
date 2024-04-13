interface Props {
  className?: string
  fill?: string
  clipPath?: string
}

export default function StarIcon({ className = '', fill, clipPath }: Props) {
  return (
    <svg className={className} height="12" viewBox="0 0 12 12" width="12">
      <path
        d="M6.5 0.5L8.47619 4.10341L12.5 4.89091L9.71429 7.87386L10.2143 11.9545L6.5 10.2125L2.78571 11.9545L3.28571 7.87386L0.5 4.86705L4.52381 4.10341L6.5 0.5Z"
        fill={fill}
        style={{ clipPath }}
      />
    </svg>
  )
}

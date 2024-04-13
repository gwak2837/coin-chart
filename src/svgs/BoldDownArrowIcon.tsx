interface Props {
  className?: string
}

export default function BoldDownArrowIcon({ className = '' }: Props) {
  return (
    <svg
      className={`fill-black dark:fill-white ${className}`}
      height="7"
      viewBox="0 0 14 7"
      width="14"
    >
      <path d="M0.841263 0.209199C1.07558 -0.0251155 1.45548 -0.0251155 1.68979 0.209199L6.99886 5.51827L12.3079 0.209199C12.5422 -0.0251155 12.9221 -0.0251155 13.1565 0.209199C13.3908 0.443514 13.3908 0.823413 13.1565 1.05773L7.42313 6.79106C7.18881 7.02538 6.80891 7.02538 6.5746 6.79106L0.841263 1.05773C0.606949 0.823413 0.606949 0.443514 0.841263 0.209199Z" />
    </svg>
  )
}

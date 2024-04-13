interface Props {
  className?: string
}

export default function 무료Badge({ className = '' }: Props) {
  return (
    <svg className={className} height="15" viewBox="0 0 22 15" width="22">
      <rect fill="#324155" height="15" rx="2" width="22" />
      <g clipPath="url(#clip0_15104_10633)">
        <g clipPath="url(#clip1_15104_10633)">
          <path
            d="M4.17916 7.48793V3.71143H10.1884V7.48793H4.17916ZM9.05126 4.69913H5.31626V6.50853H9.05126V4.69913ZM3.79736 8.39263H10.5702V9.38033H7.73986V11.364H6.60276V9.38033H3.79736V8.39263Z"
            fill="white"
          />
          <path
            d="M13.118 7.68713H18.0731V8.67483H16.936V9.91983H18.3719V10.9075H11.5991V9.91983H13.0765V8.67483H11.9809V5.70343H16.853V4.74063H11.9809V3.75293H17.9901V6.69113H13.118V7.68713ZM15.8155 8.67483H14.2053V9.91983H15.8155V8.67483Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_15104_10633">
          <rect fill="white" height="9" transform="translate(3 3)" width="16" />
        </clipPath>
        <clipPath id="clip1_15104_10633">
          <rect fill="white" height="8" transform="translate(3.5 3.5)" width="15" />
        </clipPath>
      </defs>
    </svg>
  )
}

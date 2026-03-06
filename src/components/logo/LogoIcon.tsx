export default function LogoIcon({ isFooter = false }: { isFooter?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="33"
      fill="none"
      className={isFooter ? "border-outline border" : ""}
    >
      <g clipPath="url(#a)">
        <path fill="#1A1A1A" d="M0 0h33v33H0z" />
        <rect
          width="16.212"
          height="16.212"
          x="16.5"
          y="5.036"
          stroke="#fffdfa"
          strokeWidth=".794"
          rx="8.106"
          transform="rotate(45 16.5 5.036)"
        />
        <rect
          width="16.212"
          height="16.212"
          x="19.676"
          y="5.036"
          stroke="#fffdfa"
          strokeWidth=".794"
          rx="8.106"
          transform="rotate(45 19.676 5.036)"
        />
        <rect
          width="16.212"
          height="16.212"
          x="22.851"
          y="5.036"
          stroke="#fffdfa"
          strokeWidth=".794"
          rx="8.106"
          transform="rotate(45 22.85 5.036)"
        />
        <rect
          width="16.212"
          height="16.212"
          x="26.026"
          y="5.036"
          stroke="#fffdfa"
          strokeWidth=".794"
          rx="8.106"
          transform="rotate(45 26.026 5.036)"
        />
        <rect
          width="16.212"
          height="16.212"
          x="29.201"
          y="5.036"
          stroke="#fffdfa"
          strokeWidth=".794"
          rx="8.106"
          transform="rotate(45 29.201 5.036)"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#00ff00" d="M0 0h33v33H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

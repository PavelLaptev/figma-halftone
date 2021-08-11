import * as React from "react";

const iconcolor = "var(--light-clr)";

const icons = {
  "dark-theme": (
    <>
      <circle cx="10" cy="10" r="7" stroke={iconcolor} strokeWidth="2" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C8.32151 2 6.76375 2.51692 5.47723 3.40025C8.96591 3.58062 11.7391 6.46645 11.7391 10C11.7391 13.5336 8.96591 16.4194 5.47724 16.5998C6.76376 17.4831 8.32151 18 10 18Z"
        fill={iconcolor}
      />
    </>
  ),
  fold: (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 3H3V17H17V3ZM15 5H5L5 15H15V5Z"
        fill={iconcolor}
      />
    </>
  ),
  unfold: (
    <>
      <rect x="3" y="9" width="14" height="2" fill={iconcolor} />
    </>
  ),
  "light-theme": (
    <>
      <path
        d="M15 10C15 12.7614 12.7614 15 10 15C7.23858 15 5 12.7614 5 10C5 7.23858 7.23858 5 10 5C12.7614 5 15 7.23858 15 10Z"
        stroke={iconcolor}
        strokeWidth="2"
      />
      <path d="M9 0H11V2H9V0Z" fill={iconcolor} />
      <path d="M9 18H11V20H9V18Z" fill={iconcolor} />
      <path d="M20 9V11H18V9H20Z" fill={iconcolor} />
      <path d="M2 9V11H0L8.74228e-08 9H2Z" fill={iconcolor} />
      <path
        d="M16.364 2.22183L17.7782 3.63604L16.364 5.05025L14.9497 3.63604L16.364 2.22183Z"
        fill={iconcolor}
      />
      <path
        d="M3.63604 14.9497L5.05025 16.364L3.63604 17.7782L2.22183 16.364L3.63604 14.9497Z"
        fill={iconcolor}
      />
      <path
        d="M17.7782 16.364L16.364 17.7782L14.9497 16.364L16.364 14.9497L17.7782 16.364Z"
        fill={iconcolor}
      />
      <path
        d="M5.05025 3.63604L3.63604 5.05025L2.22183 3.63604L3.63604 2.22182L5.05025 3.63604Z"
        fill={iconcolor}
      />
    </>
  )
};

export default icons;

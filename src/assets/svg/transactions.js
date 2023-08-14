import React from 'react'

const AvatarSvg = (props) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="24" height="24" rx="2" fill={props.color} />
        <path
            d="M8.31101 7V17H6.16507V7H8.31101ZM11.5263 7V8.61401H3V7H11.5263Z"
            fill="white"
        />
        <path
            d="M14.5263 7L16.4928 10.489L18.4593 7H20.9211L17.8852 11.9588L21 17H18.5167L16.4928 13.4423L14.4689 17H11.9713L15.0933 11.9588L12.0502 7H14.5263Z"
            fill="white"
        />
    </svg>
)

export default AvatarSvg

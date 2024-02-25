"use client"

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ReactNode } from "react";

const Progressbar = ({children}:{children :ReactNode}) => {
  return (
    <>
    {children}
    <ProgressBar
      height="4px"
      color="#000"
      options={{ showSpinner: false }}
      shallowRouting
    />
  </>
  )
}

export default Progressbar

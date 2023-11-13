import React from 'react'
import SVG from 'react-inlinesvg'
import {toAbsoluteUrl} from '../AssetHelpers'
import '../../../_jutemplate/assets/css/custom.css'
type Props = {
  className?: string
  path: string
  svgClassName?: string
}
//svg-icon-sidebar-new
const KTSVG: React.FC<Props> = ({className = '', path, svgClassName = 'mh-50px' }) => {
  return (
    <span className={`svg-icon ${className}`}>
       <SVG src={toAbsoluteUrl(path)} className={`${ svgClassName } svg-icon-sidebar-new`} />
    </span>
  )
}

export {KTSVG}

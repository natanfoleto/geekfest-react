import { ImgHTMLAttributes } from 'react';
import styles from './Avatar.module.css'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
}

export function Avatar({ hasBorder = true, ...rest }: AvatarProps) {
  return (
    <img 
      {...rest}
      className={hasBorder ? "w-[calc(3rem + 12px)] h-[calc(3rem + 12px)] rounded-lg border-4 border-solid border-zinc-800 outline-2 outline outline-green-500" : "w-12 h-12 rounded-lg"} 
    />
  )
}
import type { ImgHTMLAttributes } from 'react'
import { imageAttributes } from '../lib/publicAsset'

/** Local responsive images, with a safe fallback for non-catalogue assets. */
export default function OptimizedImage({ src, loading, fetchPriority, decoding = 'async', sizes, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return <img
    {...imageAttributes(src ?? '', sizes)}
    {...props}
    loading={loading ?? (fetchPriority === 'high' ? 'eager' : 'lazy')}
    decoding={decoding}
    fetchPriority={fetchPriority}
  />
}

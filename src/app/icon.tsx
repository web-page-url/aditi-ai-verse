import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
          position: 'relative',
        }}
      >
        {/* Code brackets */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            fontFamily: 'monospace',
          }}
        >
          {'</>'}
        </div>

        {/* Arrow indicator */}
        <div
          style={{
            position: 'absolute',
            right: '4px',
            bottom: '4px',
            color: 'rgba(255,255,255,0.8)',
            fontSize: '8px',
            fontWeight: 'bold',
          }}
        >
          →
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

export const HeritageCorner = ({ className, rotate = 0 }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <path d="M1 1C1 12.5 12.5 23 24 23" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M1 8C1 15.5 9.5 23 17 23" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="5" cy="5" r="1.5" fill="#B8860B" />
  </svg>
)

export const HeritageDivider = () => (
  <div className="flex items-center justify-center w-full my-4">
    <div className="h-px bg-amber-800/30 flex-grow"></div>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-2">
      <path
        d="M12 4L14.5 9.5L20.5 10.5L16 14.5L17.5 20.5L12 17.5L6.5 20.5L8 14.5L3.5 10.5L9.5 9.5L12 4Z"
        fill="#B8860B"
        fillOpacity="0.2"
        stroke="#B8860B"
        strokeWidth="1"
      />
    </svg>
    <div className="h-px bg-amber-800/30 flex-grow"></div>
  </div>
)

export const HeritageDecoration = () => (
  <svg width="120" height="20" viewBox="0 0 120 20" fill="none" className="opacity-30">
    <path d="M0 10H50M70 10H120" stroke="#B8860B" strokeWidth="1" />
    <path
      d="M50 10C50 4.5 55.5 0 60 0C64.5 0 70 4.5 70 10C70 15.5 64.5 20 60 20C55.5 20 50 15.5 50 10Z"
      stroke="#B8860B"
      strokeWidth="1"
    />
    <circle cx="60" cy="10" r="3" fill="#B8860B" fillOpacity="0.5" />
  </svg>
)


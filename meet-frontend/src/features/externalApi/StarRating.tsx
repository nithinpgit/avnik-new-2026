import './starRating.css'

type StarRatingProps = {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

export function StarRating({ value, onChange, disabled = false }: StarRatingProps) {
  return (
    <div className="star-rating" role="radiogroup" aria-label="Rate the session">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= value
        return (
          <button
            key={star}
            type="button"
            className={`star-rating__star${filled ? ' star-rating__star--active' : ''}`}
            role="radio"
            aria-checked={filled}
            aria-label={`${star} star${star === 1 ? '' : 's'}`}
            disabled={disabled}
            onClick={() => onChange(star)}
          >
            <svg viewBox="0 0 24 24" aria-hidden focusable="false">
              <path d="M12 2.5l2.9 6.1 6.8.6-5.1 4.5 1.6 6.7L12 17.8 5.8 20.4l1.6-6.7-5.1-4.5 6.8-.6L12 2.5z" />
            </svg>
          </button>
        )
      })}
    </div>
  )
}

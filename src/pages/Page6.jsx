import { useState } from 'react'

const places = ['종로', '홍대', '한강', '성수', '용산']

function Page6({ onNext }) {
  const [selectedPlace, setSelectedPlace] = useState('')
  const [showError, setShowError] = useState(false)
  const [isDecided, setIsDecided] = useState(false)

  const selectPlace = (place) => {
    setSelectedPlace(place)
    setShowError(false)
    setIsDecided(false)
  }

  const decidePlace = () => {
    if (!selectedPlace) {
      setShowError(true)
      return
    }

    setIsDecided(true)
    onNext(selectedPlace)
  }

  return (
    <main className="page page-six">
      <div className="place-heart" aria-hidden="true">♡</div>
      <div className="place-sparkles" aria-hidden="true">✦ · ✦</div>

      <section className="place-card" aria-labelledby="place-title">
        <h1 id="place-title">
          <span>한번만 봐줄게</span>
          <span>어디갈지 다시 골라줘!</span>
        </h1>

        <div className="place-list" role="radiogroup" aria-label="만날 장소">
          {places.map((place, index) => (
            <button
              className={`place-option ${selectedPlace === place ? 'is-selected' : ''}`}
              type="button"
              role="radio"
              aria-checked={selectedPlace === place}
              style={{ '--place-tilt': `${index % 2 === 0 ? -1 : 1}deg` }}
              onClick={() => selectPlace(place)}
              key={place}
            >
              {place}
            </button>
          ))}
        </div>

        <p className={`place-error ${showError ? 'is-visible' : ''}`} role="alert">
          장소를 하나 골라줘!
        </p>
      </section>

      <button className="decide-button" type="button" onClick={decidePlace}>
        결정!
      </button>

      <p className={`decided-note ${isDecided ? 'is-visible' : ''}`} aria-live="polite">
        {selectedPlace}로 정했다! ♡
      </p>
    </main>
  )
}

export default Page6

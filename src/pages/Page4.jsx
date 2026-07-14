import { useRef, useState } from 'react'
import { getKoreanVocative } from '../utils/korean'

function Page4({ name, onGiveUp }) {
  const [choice, setChoice] = useState('')
  const [meetButtonOffset, setMeetButtonOffset] = useState({ x: 0, y: 0 })
  const meetButtonRef = useRef(null)
  const vocativeName = getKoreanVocative(name)

  const keepMeetButtonAway = (event) => {
    if (event.pointerType !== 'mouse') return

    const button = meetButtonRef.current
    if (!button) return

    const buttonRect = button.getBoundingClientRect()
    const cardRect = event.currentTarget.getBoundingClientRect()
    const safeDistanceX = 82
    const safeDistanceY = 68
    const isCursorNear =
      event.clientX > buttonRect.left - safeDistanceX &&
      event.clientX < buttonRect.right + safeDistanceX &&
      event.clientY > buttonRect.top - safeDistanceY &&
      event.clientY < buttonRect.bottom + safeDistanceY

    if (!isCursorNear) return

    const maxX = Math.max(44, Math.min(104, (cardRect.width - buttonRect.width) / 2 - 9))
    const originalCenterX = buttonRect.left + buttonRect.width / 2 - meetButtonOffset.x
    const originalCenterY = buttonRect.top + buttonRect.height / 2 - meetButtonOffset.y
    const candidates = [
      { x: -maxX, y: -48 },
      { x: maxX, y: -48 },
      { x: -maxX, y: 34 },
      { x: maxX, y: 34 },
    ]

    const farthestPosition = candidates.reduce((farthest, candidate) => {
      const candidateX = originalCenterX + candidate.x
      const candidateY = originalCenterY + candidate.y
      const distance = (candidateX - event.clientX) ** 2 + (candidateY - event.clientY) ** 2

      return distance > farthest.distance ? { ...candidate, distance } : farthest
    }, { x: 0, y: 0, distance: -1 })

    setMeetButtonOffset((current) => {
      if (current.x === farthestPosition.x && current.y === farthestPosition.y) {
        return current
      }

      return { x: farthestPosition.x, y: farthestPosition.y }
    })
  }

  const dodgeTouch = (event) => {
    if (event.pointerType === 'mouse') return

    event.preventDefault()

    const button = meetButtonRef.current
    const card = button?.closest('.apology-card')
    if (!button || !card) return

    const buttonRect = button.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()
    const maxX = Math.max(44, Math.min(104, (cardRect.width - buttonRect.width) / 2 - 9))

    setMeetButtonOffset((current) => ({
      x: current.x >= 0 ? -maxX : maxX,
      y: current.y >= 0 ? -48 : 34,
    }))
  }

  const selectGiveUp = () => {
    setChoice('give-up')
    onGiveUp()
  }

  return (
    <main className="page page-four">
      <div className="apology-cloud apology-cloud-one" aria-hidden="true" />
      <div className="apology-cloud apology-cloud-two" aria-hidden="true" />

      <section
        className="apology-card"
        aria-labelledby="apology-title"
        onPointerMove={keepMeetButtonAway}
      >
        <div className="sad-face" aria-hidden="true">
          <span>·</span>
          <span>︵</span>
          <span>·</span>
        </div>

        <h1 id="apology-title">
          <span>{vocativeName} 정말 미안해...</span>
          <span>아래에 선택지를 준비했어</span>
          <span>골라줘!</span>
        </h1>

        <div className="apology-choices" aria-label="선택지">
          <button
            ref={meetButtonRef}
            className="apology-button meet-button"
            type="button"
            aria-label="그래도 만날게, 잡을 수 없는 선택지"
            style={{
              '--dodge-x': `${meetButtonOffset.x}px`,
              '--dodge-y': `${meetButtonOffset.y}px`,
            }}
            onPointerDown={dodgeTouch}
          >
            그래도 만날게
          </button>
          <button
            className={`apology-button give-up-button ${choice === 'give-up' ? 'is-selected' : ''}`}
            type="button"
            aria-pressed={choice === 'give-up'}
            onClick={selectGiveUp}
          >
            포기하기
          </button>
        </div>
      </section>

      <div className="apology-scribble" aria-hidden="true">〰 〰</div>
    </main>
  )
}

export default Page4

import { useRef, useState } from 'react'
import { getKoreanVocative } from '../utils/korean'

function Page4({ name, onGiveUp }) {
  const [choice, setChoice] = useState('')
  const [meetButtonOffset, setMeetButtonOffset] = useState({ x: 0, y: 0 })
  const meetButtonRef = useRef(null)
  const meetButtonOriginRef = useRef(null)
  const vocativeName = getKoreanVocative(name)

  const findFarthestPosition = (pointerX, pointerY, pageRect, buttonRect) => {
    if (!meetButtonOriginRef.current) {
      meetButtonOriginRef.current = {
        x: buttonRect.left + buttonRect.width / 2 - meetButtonOffset.x,
        y: buttonRect.top + buttonRect.height / 2 - meetButtonOffset.y,
      }
    }

    const origin = meetButtonOriginRef.current
    const edgeGap = 34
    const halfWidth = buttonRect.width / 2
    const halfHeight = buttonRect.height / 2
    const left = pageRect.left + edgeGap + halfWidth
    const right = pageRect.right - edgeGap - halfWidth
    const top = pageRect.top + edgeGap + halfHeight
    const bottom = pageRect.bottom - edgeGap - halfHeight
    const middleY = pageRect.top + pageRect.height / 2
    const targetPoints = [
      { x: left, y: top },
      { x: right, y: top },
      { x: left, y: bottom },
      { x: right, y: bottom },
      { x: left, y: middleY },
      { x: right, y: middleY },
    ]

    const farthestPoint = targetPoints.reduce((farthest, point) => {
      const distance = (point.x - pointerX) ** 2 + (point.y - pointerY) ** 2
      return distance > farthest.distance ? { ...point, distance } : farthest
    }, { x: left, y: top, distance: -1 })

    return {
      x: farthestPoint.x - origin.x,
      y: farthestPoint.y - origin.y,
    }
  }

  const keepMeetButtonAway = (event) => {
    if (event.pointerType !== 'mouse') return

    const button = meetButtonRef.current
    if (!button) return

    const buttonRect = button.getBoundingClientRect()
    const pageRect = event.currentTarget.getBoundingClientRect()
    const safeDistanceX = 82
    const safeDistanceY = 68
    const isCursorNear =
      event.clientX > buttonRect.left - safeDistanceX &&
      event.clientX < buttonRect.right + safeDistanceX &&
      event.clientY > buttonRect.top - safeDistanceY &&
      event.clientY < buttonRect.bottom + safeDistanceY

    if (!isCursorNear) return

    const farthestPosition = findFarthestPosition(
      event.clientX,
      event.clientY,
      pageRect,
      buttonRect,
    )

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
    const page = button?.closest('.page-four')
    if (!button || !page) return

    const buttonRect = button.getBoundingClientRect()
    const pageRect = page.getBoundingClientRect()
    setMeetButtonOffset(
      findFarthestPosition(event.clientX, event.clientY, pageRect, buttonRect),
    )
  }

  const selectGiveUp = () => {
    setChoice('give-up')
    onGiveUp()
  }

  return (
    <main className="page page-four" onPointerMove={keepMeetButtonAway}>
      <div className="apology-cloud apology-cloud-one" aria-hidden="true" />
      <div className="apology-cloud apology-cloud-two" aria-hidden="true" />

      <section
        className="apology-card"
        aria-labelledby="apology-title"
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

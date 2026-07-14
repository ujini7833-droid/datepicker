import { useState } from 'react'

function Page7({ place, onNext }) {
  const [date, setDate] = useState('')
  const [showError, setShowError] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [year = '', month = '', day = ''] = date.split('-')

  const changeDate = (event) => {
    setDate(event.target.value)
    setShowError(false)
    setIsConfirmed(false)
  }

  const confirmDate = () => {
    if (!date) {
      setShowError(true)
      return
    }

    setIsConfirmed(true)
    onNext(date)
  }

  return (
    <main className="page page-seven">
      <div className="calendar-doodle" aria-hidden="true">
        <span>⌇</span>
        <i />
        <span>⌇</span>
      </div>

      <section className="date-card" aria-labelledby="date-title">
        <p className="chosen-place">장소는 {place}!</p>
        <h1 id="date-title">언제 보는게 좋아?</h1>

        <label className="calendar-picker">
          <span>달력에서 날짜 고르기</span>
          <input
            type="date"
            value={date}
            onChange={changeDate}
            aria-describedby="date-error"
            aria-invalid={showError}
          />
        </label>

        <div className="date-parts" aria-label={date ? `${year}년 ${month}월 ${day}일` : '선택한 날짜 없음'}>
          <div className="date-part year-part">
            <span>{year || '____'}</span>
            <small>년</small>
          </div>
          <div className="date-part">
            <span>{month || '__'}</span>
            <small>월</small>
          </div>
          <div className="date-part">
            <span>{day || '__'}</span>
            <small>일</small>
          </div>
        </div>

        <p id="date-error" className={`date-error ${showError ? 'is-visible' : ''}`} role="alert">
          날짜를 먼저 골라줘!
        </p>
      </section>

      <button className="date-confirm-button" type="button" onClick={confirmDate}>
        이때가 좋아!
      </button>

      <p className={`date-confirmed-note ${isConfirmed ? 'is-visible' : ''}`} aria-live="polite">
        좋아, 이날로 기억할게 ♡
      </p>

      <div className="calendar-stars" aria-hidden="true">✦ · ✦</div>
    </main>
  )
}

export default Page7

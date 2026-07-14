import { useState } from 'react'
import { CalendarDays } from 'lucide-react'

function getTodayString() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function Page7({ place, onNext }) {
  const [date, setDate] = useState('')
  const [dateError, setDateError] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [year = '', month = '', day = ''] = date.split('-')

  const changeDate = (event) => {
    const selectedDate = event.target.value
    setDate(selectedDate)
    setIsConfirmed(false)

    if (selectedDate && selectedDate < getTodayString()) {
      setDateError('오늘보다 이전 날짜야! 다시 골라줘.')
      return
    }

    setDateError('')
  }

  const confirmDate = () => {
    if (!date) {
      setDateError('날짜를 먼저 골라줘!')
      return
    }

    if (date < getTodayString()) {
      setDateError('오늘보다 이전 날짜야! 다시 골라줘.')
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
          <span className="date-input-wrap">
            <input
              type="date"
              value={date}
              onChange={changeDate}
              aria-describedby="date-error"
              aria-invalid={Boolean(dateError)}
            />
            <CalendarDays
              className="date-picker-icon"
              size={21}
              strokeWidth={2.2}
              aria-hidden="true"
            />
          </span>
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

        <p id="date-error" className={`date-error ${dateError ? 'is-visible' : ''}`} role="alert">
          {dateError || '날짜를 먼저 골라줘!'}
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

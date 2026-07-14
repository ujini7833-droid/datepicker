import { useState } from 'react'

function Page2({ name, onNext, onReject }) {
  const [answer, setAnswer] = useState('')

  const handleReject = () => {
    setAnswer('no')
    onReject()
  }

  return (
    <main className="page page-two">
      <div className="question-marks" aria-hidden="true">
        <span>?</span>
        <span>?</span>
        <span>?</span>
      </div>

      <section className="choice-card" aria-labelledby="play-question">
        <p className="hello-name">{name}님!</p>
        <h1 id="play-question">저랑 놀아주실래요?</h1>

        <p className="choice-note">
          마음이 가는 쪽을
          <br />
          꾹 눌러주세요
        </p>

        <div className="choice-buttons">
          <button
            className="choice-button choice-yes"
            type="button"
            onClick={onNext}
          >
            당장 가요!
          </button>
          <button
            className={`choice-button choice-no ${answer === 'no' ? 'is-shaking' : ''}`}
            type="button"
            onClick={handleReject}
          >
            제가 왜요?
          </button>
        </div>

        <p className={`answer-message answer-${answer}`} aria-live="polite">
          {answer === 'yes' && '역시! 잘 골랐어요 ♡'}
          {answer === 'no' && '에이... 한 번만 다시 생각해 봐요!'}
        </p>
      </section>

      <div className="heart-doodle" aria-hidden="true">♡</div>
      <div className="tiny-stars" aria-hidden="true">·</div>
    </main>
  )
}

export default Page2

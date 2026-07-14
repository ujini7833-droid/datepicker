import { useRef, useState } from 'react'

function Page1({ name, onNameChange, onNext }) {
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!name.trim()) {
      setError('이름을 먼저 알려주세요!')
      inputRef.current?.focus()
      return
    }

    setError('')
    onNext()
  }

  const handleChange = (event) => {
    onNameChange(event.target.value)
    if (error) setError('')
  }

  return (
    <main className="page page-one">
      <div className="doodle doodle-top" aria-hidden="true">
        <span>✦</span>
        <i />
        <span>✦</span>
      </div>

      <form className="intro" onSubmit={handleSubmit} noValidate>
        <div className="intro-card">
          <p className="eyebrow">잠깐!</p>
          <h1>
            여기 들어온 당신!
            <br />
            이름부터 말하시죠
            <br />
          </h1>
          <h4>성 빼고 알려줘!</h4>

          <label className="name-field">
            <span className="sr-only">이름</span>
            <input
              ref={inputRef}
              value={name}
              onChange={handleChange}
              placeholder="이름 입력"
              maxLength={12}
              autoComplete="name"
              aria-describedby="name-error"
              aria-invalid={Boolean(error)}
            />
          </label>

          <p id="name-error" className={`error-message ${error ? 'visible' : ''}`}>
            {error || '이름을 먼저 알려주세요!'}
          </p>
        </div>

        <button className="confirm-button" type="submit">
          확인
        </button>
      </form>

      <div className="doodle doodle-bottom" aria-hidden="true">
        <span>⌁</span>
        <span>✦</span>
        <span>⌁</span>
      </div>
    </main>
  )
}

export default Page1

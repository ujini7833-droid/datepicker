function formatDate(date, separator = '.') {
  return date.split('-').join(separator)
}

function Page8({ place, date, onRestart }) {
  const displayDate = formatDate(date)

  const saveAsImage = async () => {
    await document.fonts.load('64px Memoment')

    const canvas = document.createElement('canvas')
    canvas.width = 1080
    canvas.height = 1350

    const context = canvas.getContext('2d')
    context.fillStyle = '#cedcea'
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = '#fffefb'
    context.strokeStyle = '#1a2635'
    context.lineWidth = 8
    context.beginPath()
    context.roundRect(100, 165, 880, 940, 30)
    context.fill()
    context.stroke()

    context.textAlign = 'center'
    context.fillStyle = '#1a2635'
    context.font = '64px Memoment, sans-serif'
    context.fillText('비 오니까 오늘은 말고', 540, 320)
    context.fillText('이때는 진짜 만나자!', 540, 410)

    context.strokeStyle = '#cedcea'
    context.lineWidth = 6
    context.strokeRect(230, 540, 620, 310)

    context.textAlign = 'left'
    context.fillStyle = '#3e8193'
    context.font = '48px Memoment, sans-serif'
    context.fillText('날짜', 300, 655)
    context.fillText('장소', 300, 770)

    context.fillStyle = '#1a2635'
    context.fillText(displayDate, 470, 655)
    context.fillText(place, 470, 770)

    context.textAlign = 'center'
    context.fillStyle = '#d96772'
    context.font = '42px Memoment, sans-serif'
    context.fillText('우리 이날 꼭 만나기 ♡', 540, 995)

    const link = document.createElement('a')
    link.download = `우리의-약속-${date}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <main className="page page-eight">
      <div className="result-ribbon" aria-hidden="true">〰 ♡ 〰</div>

      <section className="result-wrap" aria-labelledby="result-title">
        <article className="result-card">
          <p className="result-kicker">우리의 약속</p>
          <h1 id="result-title">
            비 오니까 오늘은 말고
            <br />
            이때는 진짜 만나자!
          </h1>

          <dl className="plan-summary">
            <div>
              <dt>날짜</dt>
              <dd>{displayDate}</dd>
            </div>
            <div>
              <dt>장소</dt>
              <dd>{place}</dd>
            </div>
          </dl>

          <button className="save-image-button" type="button" onClick={saveAsImage}>
            이미지 저장
          </button>
        </article>

        <button className="restart-home-button" type="button" onClick={onRestart}>
          <span aria-hidden="true">↩ </span>
          처음으로
        </button>
      </section>

      <div className="result-stars" aria-hidden="true">✦ · ✦</div>
    </main>
  )
}

export default Page8

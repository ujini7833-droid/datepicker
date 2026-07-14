import { RotateCcw } from 'lucide-react'
import { getKoreanVocative } from '../utils/korean'

function formatDate(date, separator = '.') {
  return date.split('-').join(separator)
}

function createPngFile(dataUrl, fileName) {
  const base64 = dataUrl.split(',')[1]
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }

  return new File([bytes], fileName, { type: 'image/png' })
}

function downloadImage(dataUrl, fileName, file) {
  const link = document.createElement('a')
  link.download = fileName
  link.href = dataUrl
  document.body.append(link)
  link.click()
  link.remove()

  if (navigator.maxTouchPoints > 0 && !navigator.share) {
    const imageUrl = URL.createObjectURL(file)
    window.open(imageUrl, '_blank')
    window.setTimeout(() => URL.revokeObjectURL(imageUrl), 60000)
  }
}

function Page8({ name, place, date, onRestart }) {
  const displayDate = formatDate(date)
  const vocativeName = getKoreanVocative(name)

  const saveAsImage = () => {
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
    context.fillText(`이때는 진짜 만나자 ${vocativeName}!`, 540, 410)

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

    const fileName = `우리의-약속-${date}.png`
    const dataUrl = canvas.toDataURL('image/png')
    const imageFile = createPngFile(dataUrl, fileName)
    const shareData = {
      files: [imageFile],
      title: '우리의 약속',
      text: `${displayDate} ${place}에서 만나기`,
    }

    if (navigator.share && navigator.canShare?.(shareData)) {
      navigator.share(shareData).catch((error) => {
        if (error.name !== 'AbortError') {
          downloadImage(dataUrl, fileName, imageFile)
        }
      })
      return
    }

    downloadImage(dataUrl, fileName, imageFile)
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
            이때는 진짜 만나자 {vocativeName}!
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
          <RotateCcw size={19} strokeWidth={2.4} aria-hidden="true" />
          처음으로
        </button>
      </section>

      <div className="result-stars" aria-hidden="true">✦ · ✦</div>
    </main>
  )
}

export default Page8

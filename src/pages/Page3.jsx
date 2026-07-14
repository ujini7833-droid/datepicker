import hamsterImage from '../assets/images/3pageHamster.jpg'

function Page3({ onNext }) {
  return (
    <main className="page page-three">
      <div className="rain rain-back" aria-hidden="true">
        {Array.from({ length: 22 }, (_, index) => (
          <i key={index} />
        ))}
      </div>

      <div className="page-three-sparkles" aria-hidden="true">✦ · ✦</div>

      <section className="story-wrap" aria-labelledby="hamster-story">

        <article className="photo-card">
          <div className="photo-tape" aria-hidden="true" />
          <figure className="hamster-photo">
            <img
              src={hamsterImage}
              alt="놀란 표정으로 '에'라고 말하는 햄스터"
            />
          </figure>

          <h1 id="hamster-story">
            이런! 비가 와서
            <br />
            오늘은 못 나가겠군요
          </h1>
        </article>

        <button className="next-button" type="button" onClick={onNext}>
          다음
          <span aria-hidden="true"> →</span>
        </button>
      </section>

      <div className="hamster-doodle" aria-hidden="true">
        <span>〰</span>
        <span>!</span>
      </div>

      <div className="rain rain-front" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <i key={index} />
        ))}
      </div>
    </main>
  )
}

export default Page3

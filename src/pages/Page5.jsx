import { getKoreanVocative } from '../utils/korean'

function Page5({ name, onContinue, onRestart }) {
  const vocativeName = getKoreanVocative(name)

  return (
    <main className="page page-five">
      <div className="anger-mark anger-mark-left" aria-hidden="true">⌁</div>
      <div className="anger-mark anger-mark-right" aria-hidden="true">⌁</div>

      <section className="upset-card" aria-labelledby="upset-title">

        <h1 id="upset-title">
          <span>비 때문에 나를 포기하다니</span>
          <span>정말 너무하다 {vocativeName}</span>
        </h1>

        <button className="unfair-button" type="button" onClick={onContinue}>
          억울해!
        </button>

        <button className="restart-button" type="button" onClick={onRestart}>
          처음부터 다시 고를래!
        </button>
      </section>

      <p className="restart-note" aria-hidden="true">
        다시 생각해 볼 기회는 줄게
        <span>↖</span>
      </p>
    </main>
  )
}

export default Page5

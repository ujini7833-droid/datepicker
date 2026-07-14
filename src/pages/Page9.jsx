function Page9({ onApologize }) {
  return (
    <main className="page page-nine">
      <div className="furious-mark furious-mark-one" aria-hidden="true">⌁</div>
      <div className="furious-mark furious-mark-two" aria-hidden="true">⌁</div>

      <section className="angry-letter" aria-labelledby="angry-title">
        <h1 id="angry-title">
          그래 나도 널 만나기 싫었고
          <br />
          너 만나기도 귀찮고
          <br />
          그냥 혼자 집에서 넷플이나
          <br />
          보려고 했어
          <br />
          나 혼자 아주 잘 놀게 됐다
          <br />
          연락하지 마
          <br />
          <strong>절대!!!</strong>
        </h1>

        <button className="apologize-button" type="button" onClick={onApologize}>
          미... 미안해
        </button>
      </section>
    </main>
  )
}

export default Page9

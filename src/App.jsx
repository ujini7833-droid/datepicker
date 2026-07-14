import { useState } from 'react'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import Page4 from './pages/Page4'
import Page5 from './pages/Page5'
import Page6 from './pages/Page6'
import Page7 from './pages/Page7'
import Page8 from './pages/Page8'
import Page9 from './pages/Page9'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [page, setPage] = useState(1)
  const [place, setPlace] = useState('')
  const [date, setDate] = useState('')

  if (page === 2) {
    return (
      <Page2
        name={name.trim()}
        onNext={() => setPage(3)}
        onReject={() => setPage(9)}
      />
    )
  }

  if (page === 3) {
    return <Page3 onNext={() => setPage(4)} />
  }

  if (page === 4) {
    return (
      <Page4
        name={name.trim()}
        onGiveUp={() => setPage(5)}
      />
    )
  }

  if (page === 5) {
    return (
      <Page5
        name={name.trim()}
        onContinue={() => setPage(6)}
        onRestart={() => setPage(2)}
      />
    )
  }

  if (page === 6) {
    return (
      <Page6
        onNext={(selectedPlace) => {
          setPlace(selectedPlace)
          setPage(7)
        }}
      />
    )
  }

  if (page === 7) {
    return (
      <Page7
        place={place}
        onNext={(selectedDate) => {
          setDate(selectedDate)
          setPage(8)
        }}
      />
    )
  }

  if (page === 8) {
    return (
      <Page8
        place={place}
        date={date}
        onRestart={() => setPage(2)}
      />
    )
  }

  if (page === 9) {
    return <Page9 onApologize={() => setPage(2)} />
  }

  return (
    <Page1
      name={name}
      onNameChange={setName}
      onNext={() => setPage(2)}
    />
  )
}

export default App

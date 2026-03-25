import React from 'react'
import Student from './components/Student'

function App() {
  const user = ["Aman",18];
  return (
    <div>
      <Student name={ user} />
    </div>
  )
}

export default App


// props da data pass krna
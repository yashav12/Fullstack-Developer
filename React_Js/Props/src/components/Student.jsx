import React from 'react'

// Passing props from App component to student component
function Student(props) {
    console.log("Props Received in Student Component:", props);

// const Student = () => {
  return (
    <div>
          <h2>Student Component</h2>
          <p>Name:{props.name}</p>
          <p>Age:{props.age}</p>
    </div>
  )
}

export default Student

//parent to chlid props da data pass krna 

//parent sada App.jsx hai te Student.jsx sada child

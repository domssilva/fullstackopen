import React from 'react'

import Part from './Part'

const Content = ({parts}) => {
  
  return (
    <div>
      {
        parts.map(course => 
          <Part 
            key={course.id} 
            part={course.name} 
            exercises={course.exercises}
          />
        )
      }
    </div>
  )
}

export default Content
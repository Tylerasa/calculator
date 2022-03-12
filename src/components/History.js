import React from 'react'

const History = ({exp}) => {
  return (
    <div className='history-wrapper'>
        {exp.exp} = {exp.answer}
    </div>
  )
}

export default History
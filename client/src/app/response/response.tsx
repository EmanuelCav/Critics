import React from 'react'

const Response = ({ msg }: { msg: string }) => {
  return (
    <div className='container-response'>
        <p className='message-response user-noselect'>{msg}</p>
    </div>
  )
}

export default Response
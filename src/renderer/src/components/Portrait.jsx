import React, { useState, useEffect } from 'react'
import { Loading } from './utilities/Loading'

export const Portrait = ({ id }) => {
  const [imgSrc, setImgSrc] = useState('')

  useEffect(() => {
    import(`../assets/portraits/${id}.png`)
      .then((image) => {
        setImgSrc(image.default)
      })
      .catch((error) => {
        console.error('Error loading image:', error)
      })
  }, [id])

  return (
    <div className="flex flex-col justify-center items-center">
      {imgSrc ? (
        <div className="image-container">
          <img src={imgSrc} alt="Portrait" />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
            <Loading />
        </div>
      )}
    </div>
  )
}


  import React  , {useRef , useEffect} from 'react'
  import ImageRecognition from '../components/dedactor/ImageRecognition'
  const Detection = () => {


 
    return (
      <div>  <div style={{ margin: "20px", padding: "20px" }}>
      <div>Here are the Predictions...</div>
      <ImageRecognition/>
    </div></div>
    )
  }
  
  export default Detection
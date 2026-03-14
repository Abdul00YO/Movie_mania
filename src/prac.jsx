import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Class Components Old method of writing components in React. It is not recommended to use this method anymore. It is still supported but it is not recommended to use it. It is better to use functional components with hooks.
/*
class App extends React.Component {
  render() {
    return (
      <h2>Class Component</h2>
    )
  }
}
*/
// Functional components
const Card = ({ title }) => {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    console.log(`${title} has been liked ${count} times`);
  },[liked]);


  return (
    <div className="Card" onClick={()=>
      setCount(count+1)
    }>
      <h2>{title} <br />{count||null}</h2>
      <button onClick={()=>{
        setLiked(!liked)
      }}>{liked ? 'Unlike' : 'Like'}</button>
    </div>
  )
}

const App = () => {
  return (
    <div className="Card_div">
      <h1>My First React App</h1>
      <p>This is my first React app. I am learning React and I am excited to learn more about it.</p>
      {/* Props:
          title -> string (movie name) they pass information to the component and the component can use that information to render something. In this case, we are passing the title of the movie to the Card component and the Card component is rendering the title of the movie.
      */}
      <div className='Card_cont'>
        <Card title="Star Wars"/> 
        <Card title="Avatar"/>
        <Card title="Lion King"/>
      </div>
    </div>
  )
}

export default App

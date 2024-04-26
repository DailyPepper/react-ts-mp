import MainRouter from "./app/routing";
import "./styles/style.css";
import Navbar from "./components/Navbar";

// window.addEventListener('load',  async ()=> {
//   if('serviceWorker' in navigator){
//     try{
//       const reg = await navigator.serviceWorker.register('/sw.ts')
//       console.log('Good', reg)
//     }catch(e){
//       console.log(e)
//     }
//   }
// })


const App = () => {

  return (
    <>
      <Navbar />
      <MainRouter />
    </>
  );
};

export default App;

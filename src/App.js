import root from './dirStruc'
import './App.css';
import React, {useState} from 'react';
import Dirpath from './components/Dirpath'

function App() {
  const [path, setPath] = useState(['root']);
  function getContent(){
    let obj = root
    for (var i=1,len=path.length; i<len; i++){
      obj = obj['children'][path[i]];
    };
    return handleContentdisplay(obj);
  }
  // for file there is a ~ sign and for directory there is a - sign
  function handleContentdisplay(obj){
   if(obj.type==="dir"){
     if(!obj.hasOwnProperty('children')){
      return `directory empty`;
     }
     return  Object.keys(obj.children).map((file)=>(
     <div>
       <span>{obj.children[file].type==='file'?'~':'-'}</span>
       <span onClick={()=>setPath([...path,file])}>{file}</span>    
     </div>
      ));
   }
   else if (obj.type==="file"){
     return `this is a file:${path[path.length-1]}`;
   }
   else{
     return `Directory path not exist error`;
   }

  }

  function gotoDir(index){
    setPath(path.slice(0,index));
  }
  return (
    <div className="App">
      <Dirpath path={path} onChange={gotoDir}/>
      <div>
      {getContent()}
      </div>
    </div>
  );
}

export default App;

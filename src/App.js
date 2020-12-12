import root from './dirStruc'
import './App.css';
import React, {useEffect, useState} from 'react';
import Dirpath from './components/Dirpath'

function App() {
  const [path, setPath] = useState(['root']);
  const [content, setContent] = useState({ type: "", children:[] });
  const [clickable,setclickable] = useState(true);
  useEffect(() => {
    getContent(path.join("/"))
  }, [path] );

  const getContent = async (pathStr)=>{
    setclickable(false)
    setTimeout(() => {
    pathStr = pathStr.split("/")
    let obj = root
    for (var i=1,len=pathStr.length; i<len; i++){
      obj = obj['children'][pathStr[i]];
    };
    if(obj.type==="dir"){
        setContent({ type: "dir", children:Object.keys(obj.children) }); 
    }
    else if (obj.type==="file"){
      setContent({ type: "file", children:[path[path.length-1]] });
    }
    else{
      setContent({ type: "error", children:[]});;
    }
    setclickable(true)
  }, 1000);
  }

  function displayContent(){
    if(content.type==="dir"){
        return  content.children.map((file)=>(
      <div>
        <span onClick={()=>gotopath(file)}>{file}</span>    
      </div>
       ));
    }
    else if(content.type==="file"){
      return`this is a file:${path[path.length-1]}`;
    }
    else {
      return null
    }
  }

  function gotopath (file){
    if(clickable){
      setPath([...path,file])
    }
  }

  function gotoDir(index){
    setPath(path.slice(0,index));
  }
  return (
    <div className="App">
      <Dirpath path={path} onChange={gotoDir}/>
      <div>
      {displayContent()}
      </div>
    </div>
  );
}

export default App;

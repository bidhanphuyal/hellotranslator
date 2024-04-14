import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const translate = () => {
    //curl -X 'POST' \'https://libretranslate.com/translate' \-H 'accept: application/json' \-H 'Content-Type: application/x-www-form-urlencoded' \-d 'q=hello&source=en&target=es&format=text&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'


    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);
    params.append('format', 'text');
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    axios.post('https://libretranslate.com/translate', params,
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(res => {
        console.log(res.data)
        setOutput(res.data.translatedText)
      });
  };



  useEffect(() => {
    // curl -X 'GET' \'https://libretranslate.com/languages' \-H 'accept: application/json'
    axios.get('https://libretranslate.com/languages',
      { headers: { 'accept': 'application/json' } }).then(res => {
        console.log(res.data);
        setOptions(res.data);
      })
  }, [])

  return (
    <div className="App">
      <h1>Hello Translator</h1>
      <div>
        From({from}):
        <select onChange={e => setFrom(e.target.value)}>
          {options.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)}
        </select>
        To({to}):
        <select onChange={e => setTo(e.target.value)}>
          {options.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)}
        </select>
      </div>

      <div>
        <textarea cols="50" rows="8" onInput={(e) => setInput(e.target.value)}></textarea>
      </div>

      <div>
        <textarea cols="50" rows="8" value={output}></textarea>
      </div>

      <div>
        <button onClick={e=>translate()}>Translate</button>
      </div>
    </div>
  );
}

export default App;

import React , { useState } from 'react';
import './App.css';

import * as dataL from '../src/assets/languages.json';
import * as dataC from '../src/assets/countries.json';
import * as dataW from '../src/assets/Wishes.json';
const fs = require('fs');
const divDOWN = document.createElement("div");
divDOWN.id="message";
document.body.appendChild(divDOWN)
let myObj = JSON.stringify(dataC);
let countriesList : string[] = []

let countrieAndName: { value: string }[] = []
let countrieAndLanguage: { language: LanguageT }[] = []
let countrieAndWishes: { language: LanguageT,wishe: LanguageT}[] = []

let myObjL = JSON.stringify(dataL);

let myObjW = JSON.stringify(dataW);
type LanguageT = string

interface MyObj {
  Language: LanguageT
  Wishe: string
}
myObjW = myObjW.slice(11,myObjW.length - 1)
let obj :MyObj[]  = JSON.parse(myObjW)

const App: React.FunctionComponent = () => {
 
  function searchWishesForALanguage (language : LanguageT) :string {
    let res: string = ""
    for (let i = 0 ; i < obj.length ; i++){
      if(language.toLocaleLowerCase().includes(obj[i].Language.toLocaleLowerCase())){
        res = obj[i].Wishe;
      }
    }
    return res
  }
  function countries(): string[] {
    for(let i = 0 ; i < myObj.split("},").length ; i++){
      let str : string = (myObj.split("},")[i].split(",")[0]).split(":")[2]
      str = str.replaceAll('\"' , '')
      if (!str.includes("name")){        
        countriesList.push(str);
        countrieAndName.push(  { "value": str });
      }
  }
  return countriesList
}

  const [selectedOption, setSelectedOption] = useState<String>();
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    countrieAndLanguage=[]
    countrieAndWishes = []

  for(let i = 0 ; i < myObj.split("},").length ; i++){
    let str : String = myObj.split("},")[i]
    if(str.includes('"name":"' +value+'"')){
      let allLanguages  = str.split(":")[8].split(",")
      for (let k = 0 ; k < allLanguages.length ; k++){
        let s : string = allLanguages[k];
        s  = s.substring(1,s.length-1);
        s = s.replaceAll('\"','');
        s = "\""+s+"\"";
        

        for(let i = 0 ; i < myObjL.split("},").length ; i++){
          let str : String = myObjL.split("},")[i]
          if(str.includes(s)){
            var l = str.split(":")[2].split(",")[0]
            countrieAndLanguage.push(  { "language":l });
            countrieAndWishes.push({"language": l,wishe:searchWishesForALanguage(l)})
          }
        }
      }

    }
  } 
    setSelectedOption(value);
  };
  countries();
  return (
    <div className='App' >
      <select defaultValue={'DEFAULT'} className='App-select' onChange={selectChange} >
        <option selected disabled>
          Choose one
        </option>
        {countrieAndName.map((option) => (
            <option value={option.value}>{option.value}</option>
  
        ))}          
      </select>    
      <p >{selectedOption} </p>
      <div>
        <table>
        {countrieAndLanguage.map((option) => (
            <tr>
              <td>{option.language}</td>
              <td onClick={() => sendMail(searchWishesForALanguage(option.language))}>{searchWishesForALanguage(option.language) }</td>
            </tr>
        ))}
        </table>
      
      </div>
    </div>
  );
};
//onClick={() => this.fetchData("dfd")}
//sendMail('e')

function sendMail(message : string){
  let mail = document.createElement("a");
  mail.href = "mailto:?subject=2022&body="+message+" 2022 !"+"🥳";
  mail.click();
  //alert("mail : " + message)
}

export const messageChoisi:string = "message-A-Afficher"
export default App;

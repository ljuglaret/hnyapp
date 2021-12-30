import React , { useState } from 'react';
import './App.css';
import './Metrics'

import * as dataL from '../src/assets/languages.json';
import * as dataC from '../src/assets/countries.json';
import * as dataW from '../src/assets/Wishes.json';
import { metrics, missingLanguages } from './Metrics';
const fs = require('fs');
const divDOWN = document.createElement("div");
divDOWN.id="message";
document.body.appendChild(divDOWN)

let countriesName : {value:string}[] = []

let countriesLanguage: { language:string}[] = []
let countriesWishe : { language: string,wishe: string}[] = []

function compare( a : {value:string}, b : {value:string} ) {
  if ( a.value < b.value ){
    return -1;
  }
  else if ( a.value > b.value ){
    return 1;
  }
  else {return 0};
}

var keysC : string[]= Object.keys(dataC.countries)

function countries():  {value:string}[] {
  for (let i = 0 ; i < keysC.length ; i++){
    //@ts-ignore
    countriesName.push({"value":dataC.countries[keysC[i]].name});
  } 
  return countriesName.sort(compare);
}

function searchWishesForALanguage (languageW : string) :string {
  let res: string = ""
  for (let i = 0 ; i < dataW.list.length ; i++){
    if ((dataW.list[i].Language).toLowerCase() == languageW.toLowerCase()){
      res = dataW.list[i].Wishe
    }
  }
  return res
}

//metrics()

const App: React.FunctionComponent = () => {
  countriesName = [];
  countries()
 
  const [selectedOption, setSelectedOption] = useState<String>();
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    countriesLanguage=[]
    countriesWishe = []
    for (let i = 0 ; i < keysC.length ; i++){
      //@ts-ignore
      if (value ==  dataC.countries[keysC[i]].name){
        //@ts-ignore
        var allL = dataC.countries[keysC[i]].languages;
        //@ts-ignore
        for (let j = 0 ; j < allL.length ; j++){
          //@ts-ignore
          let w = dataL.languages[allL[j]].name ;
          if (searchWishesForALanguage(w).length != 0 ) {
            countriesLanguage.push( {"language" : w} )
          }
       }
    }
  }
    setSelectedOption(value);
  };
  return (
    <div className='App' >
      <select className='App-select' onChange={selectChange} >
        <option selected disabled>
          Choose one
        </option>
        {countriesName.map((option) => (
            <option value={option.value}>{option.value}</option>
  
        ))}          
      </select>    
      <div>
        <table>
          <tbody>
        {countriesLanguage.map((option) => (
            <tr onClick={() => sendMail(searchWishesForALanguage(option.language))}>
              <td>{option.language}</td>
              <td >{searchWishesForALanguage(option.language) }</td>
            </tr>
        ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

function sendMail(message : string){
  let mail = document.createElement("a");
  mail.href = "mailto:?subject=2022&body="+message+" 2022 !"+"🥳";
  mail.click();
}

export const messageChoisi:string = "message-A-Afficher"
export default App;

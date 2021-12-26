import React , { useState } from 'react';
import './App.css';

import * as dataL from '../src/assets/languages.json';
import * as dataC from '../src/assets/countries.json';
import * as dataW from '../src/assets/Wishes.json';
import { Zlib } from 'zlib';
const fs = require('fs');
const divDOWN = document.createElement("div");
divDOWN.id="message";
document.body.appendChild(divDOWN)

let countriesName : {value:string}[] = []

let countriesLanguage: { language:string}[] = []
let countriesWishe : { language: string,wishe: string}[] = []

const App: React.FunctionComponent = () => {
 
  function searchWishesForALanguage (languageW : string) :string {
    let res: string = ""
    for (let i = 0 ; i < dataW.list.length ; i++){
      if ((dataW.list[i].Language).toLowerCase() == languageW.toLowerCase()){
        res = dataW.list[i].Wishe
      }
    }
    return res
  }
  var keysC : string[]= Object.keys(dataC.countries)
  function countries(): void {
    for (let i = 0 ; i < keysC.length ; i++){
      //@ts-ignore
      countriesName.push({"value":dataC.countries[keysC[i]].name});
    } 
}

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
          countriesLanguage.push( {"language" : dataL.languages[allL[j]].name } )
          countriesWishe.push({"language": allL[j],wishe:searchWishesForALanguage(allL[j])});
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
        {countriesName.map((option) => (
            <option value={option.value}>{option.value}</option>
  
        ))}          
      </select>    
      <p >{selectedOption} </p>
      <div>
        <table>
          <thead></thead>
          <tbody>
        {countriesLanguage.map((option) => (
            <tr>
              <td>{option.language}</td>
              <td onClick={() => sendMail(searchWishesForALanguage(option.language))}>{searchWishesForALanguage(option.language) }</td>
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

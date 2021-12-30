import * as dataL from '../src/assets/languages.json';
import * as dataC from '../src/assets/countries.json';
import * as dataW from '../src/assets/Wishes.json';

const fs = require("fs");

var keysC : string[]= Object.keys(dataC.countries)
var languagesC : string[] = []
var languagesW : string[] = []
export var missingLanguages : {"language":string}[] = []

export function metrics() : void{
  for (let i = 0 ; i < keysC.length ; i++){
      //@ts-ignore
      var allL = dataC.countries[keysC[i]].languages;
      for (let j = 0 ; j < allL.length ; j++){
        //@ts-ignore
        languagesC.push((dataL.languages[allL[j]].name ).toLowerCase())
      }
    }
  for (let i = 0 ; i <dataW.list.length ; i++){
    languagesW.push((dataW.list[i].Language).toLowerCase());
  }

  
  for (let i = 0 ; i < languagesC.length ; i++){
    if (!languagesW.includes(languagesC[i])){
        missingLanguages.push({"language":languagesC[i]});
    }
  }
  console.log(missingLanguages.sort());  
}

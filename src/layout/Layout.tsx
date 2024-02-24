import React, { useEffect, useState } from 'react'
import style from './layoutstyle.module.scss'
import Navbar from '../components/Navbar'
import IndexPage from '../components/IndexPage'
import { Outlet } from 'react-router-dom'

export interface Pokemon{
  id : number
  name : string
}


function Main(){
  const num = 2;

  const [pokemons, setPokemons] = useState<Pokemon[]|undefined>();
  
  async function getData(){
    const urls = []
    for(let i=0; i<num; i++){
      let url = `https://pokeapi.co/api/v2/pokemon-species/${i+1}`
      urls.push(url);
    };

    const promise = urls.map((url)=>fetch(url));
    
    //포켓몬 한글이름 데이터 들고오기
    const pokemNames = await Promise.all(promise)
    .then((response)=>Promise.all(response.map((res)=>res.json())))
    .then((result)=>result.map((n,i)=>{
     return({
      id : i + 1,
      name: n.names[2].name
     })
    }));

    setPokemons(pokemNames);

  }

  async function getBasicData(){
    const urls = []

    for(let i=0; i<num; i++){
      let url = `https://pokeapi.co/api/v2/pokemon/${i+1}`
      urls.push(url);
    }

    const promise = urls.map(async(url)=>await fetch(url));
    const data = await Promise.all(promise)
    .then((response)=>Promise.all(response.map((res)=>res.json())))
    .then((result)=>(result))

    const fetchTypeUrls = data.map(({ types })=>
    types?.map(({ type:{ url } }:any)=>fetch(url)));


    const KoreanTypeNames = await Promise.all(fetchTypeUrls)

    console.log(KoreanTypeNames);
  } 

  useEffect(()=>{
    getData()
    getBasicData()
  },[num])

  return(
    <div className={style.main}>
      <IndexPage pokemons={pokemons}/>
      <Outlet/>
    </div>
  )
}

export default function Layout() {
  return (
    <div className={style.layout}>
      <Navbar/>
      <Main/>
    </div>
  )
}

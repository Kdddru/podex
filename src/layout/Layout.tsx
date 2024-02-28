import React, { useEffect, useState } from 'react'
import style from './layoutstyle.module.scss'
import Navbar from '../components/Navbar'
import IndexPage from '../components/IndexPage'
import { Outlet } from 'react-router-dom'

export interface Pokemon {
  id: number
  name: string
}


function Main() {
  const [num, setNum] = useState<number>(10);

  const [pokemons, setPokemons] = useState<Pokemon[] | undefined>();
  const [pokeTypes ,setPokeTypes] = useState<any[] | undefined>();

  async function getData() {
    const urls = []
    for (let i = 0; i < num; i++) {
      let url = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}`
      urls.push(url);
    };

    const promise = urls.map((url) => fetch(url));

    //포켓몬 한글이름 데이터 들고오기
    const pokemNames = await Promise.all(promise)
      .then((response) => Promise.all(response.map((res) => res.json())))
      .then((result) => result.map((n, i) => {
        return ({
          id: i + 1,
          name: n.names[2].name
        })
      }));

    setPokemons(pokemNames);

  }

  //기본 포켓몬 데이터 들고오기
  async function getBasicData() {
    const urls = []

    for (let i = 0; i < num; i++) {
      let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`
      urls.push(url);
    }

    const promise = urls.map(async (url) => await fetch(url));

    //포켓몬 전체 데이터
    const data = await Promise.all(promise)
      .then((response) => Promise.all(response.map((res) => res.json())))
      .then((result) => (result))

    //타입 url 전부 들고오기
    const typeUrls = data.map(({ types }) =>
      types?.map(({type}: any) => type.url)
      )

    // 타입 한글 이름 들고오기
    const types = typeUrls.map(async(arr)=>{
      const url = arr.map((urls:string)=>fetch(urls));

      const typeName = await Promise.all(url)
      .then((response)=>Promise.all(response.map((res)=>res.json())))
      .then((result)=>result.map((r)=>r?.names[1].name))

      return typeName
    })
    
    //최종 타입 한글 들고오기
    const typeKoreanName = await Promise.all(types)

    setPokeTypes(typeKoreanName);
  }


  useEffect(() => {
    getData()
    getBasicData()
  }, [num])

  return (
    <div className={style.main}>
      <IndexPage pokemons={pokemons} />
      <Outlet context={pokemons}/>
    </div>
  )
}

export default function Layout() {
  return (
    <div className={style.layout}>
      <Navbar />
      <Main />
    </div>
  )
}

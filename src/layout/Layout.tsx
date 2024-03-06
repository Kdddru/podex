import React, { useCallback, useEffect, useState } from 'react'
import style from './layoutstyle.module.scss'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const IndexPage = React.lazy(()=>import('../components/IndexPage'));

export interface PokeNamesType {
  id: number | undefined
  name: string | undefined
}

export interface Pokemon extends PokeNamesType {
  type: string[] | undefined
}


function Main() {
  const [num, setNum] = useState<number>(21);
  const [pokemons, setPokemons] = useState<Pokemon[] | undefined>();
  const [pokeNames, setPokeNames] = useState<string[] | undefined>();
  const [pokeTypes, setPokeTypes] = useState<string[][] | undefined>();


  //포켓몬 이름 데이터 들고오기
  const getPokemonName = useCallback(async (n: number) => {
    const urls = []
    for (let i = 0; i < n; i++) {
      let url = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}`
      urls.push(url);
    };

    const promise = urls.map((url) => fetch(url));

    //포켓몬 한글이름 데이터 들고오기
    const pokemNames = await Promise.all(promise)
      .then((response) => Promise.all(response.map((res) => res.json())))
      .then((result) => result.map((n) => {
        return n.names[2].name
      }));

    setPokeNames(pokemNames);
  }, [num])


  const getType = useCallback(async (n: number) => {
    const urls = []

    for (let i = 0; i < n; i++) {
      let url = `https://pokeapi.co/api/v2/pokemon-form/${i + 1}`
      urls.push(url);
    }

    const promise = urls.map((url) => fetch(url));

    const data = await Promise.all(promise)
      .then((response) => Promise.all(response.map((res) => res.json())))
      .then((result) => result.map((r) => r?.types));

    const typeUrls = data.map((urls) => urls.map((url: any) => url.type.url));

    const types = typeUrls.map(async (urls) => {
      const typePromise = urls?.map((url: any) => fetch(url));

      const typeName = Promise.all(typePromise)
        .then((response) => Promise.all(response.map((res) => res.json())))
        .then((result) => result.map((r) => r.names[1].name))

      return typeName
    })

    const typeKoreanName = await Promise.all(types)

    setPokeTypes(typeKoreanName);
  }, [num])


  //실행시 데이터 들고오기
  useEffect(() => {
    getPokemonName(num);
    getType(num);
  }, [num])


  //포켓몬 이름, 타입값들이 다 존재하면 최종 데이터 만들기
  useEffect(() => {
    if (pokeNames && pokeTypes) {
      const pokemonObject = pokeNames.map((pokeNames, i) => ({
        id: i + 1,
        name: pokeNames,
        type: pokeTypes?.[i],
      }))

      setPokemons(pokemonObject)
    }
  }, [pokeNames, pokeTypes])

  return (
    <div className={style.main}>
      {
        pokeNames && pokeTypes &&
        <IndexPage pokemons={pokemons} setNum={setNum} />
      }
      <Outlet context={pokemons} />
    </div>
  )
}



//기본 레이아웃
export default function Layout() {

  return (
    <div className={style.layout}>
      <Navbar />
      <Main />
    </div>
  )
}

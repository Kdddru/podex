import React, { useCallback, useEffect, useState } from 'react'
import style from './layoutstyle.module.scss'
import Navbar from '../components/Navbar'
import IndexPage from '../components/IndexPage'
import { Outlet } from 'react-router-dom'

export interface PokeNamesType {
  id: number | undefined
  name: string | undefined
}

export interface Pokemon extends PokeNamesType {
  type: string[] | undefined
}


function Main() {
  const [num, setNum] = useState<number>(11);
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
  }, [])


  //타입 한글 들고오기
  const getType = useCallback(async (prop: any[]) => {
    //타입 url 전부 들고오기
    const typeUrls = prop.map(({ types }) =>
      types?.map(({ type }: any) => type.url)
    )

    // 타입 한글 이름 들고오기
    const types = typeUrls.map(async (arr) => {
      const url = arr.map((urls: string) => fetch(urls));

      const typeName = await Promise.all(url)
        .then((response) => Promise.all(response.map((res) => res.json())))
        .then((result) => result.map((r) => r?.names[1].name))

      return typeName
    })

    //최종 타입 한글 들고오기
    const typeKoreanName = await Promise.all(types);

    setPokeTypes(typeKoreanName);
  }, [])

  
  //기본 포켓몬 데이터 들고오기
  const getData = useCallback(async(n: number) => {
    const urls = []

    for (let i = 0; i < n; i++) {
      let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`
      urls.push(url);
    }

    const promise = urls.map(async (url) => await fetch(url));

    //포켓몬 전체 데이터
    const data = await Promise.all(promise)
      .then((response) => Promise.all(response.map((res) => res.json())))
      .then((result) => (result));

    //포켓몬 한글이름 
    //포켓몬 타입 한글 이름
    getType(data);
  }, [])


  //실행시 데이터 들고오기
  useEffect(() => {
    getPokemonName(num);
    getData(num);
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
      <IndexPage pokemons={pokemons} />
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

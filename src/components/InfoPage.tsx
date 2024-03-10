import React, { useCallback, useEffect, useState } from 'react'
import style from './component.module.scss'
import { useOutletContext, useParams } from 'react-router-dom'
import { Pokemon } from '../layout/Layout';


interface AbilityType {
  name: string
  url: string
}

type AbilitiesType = {
  ability: AbilityType
  is_hidden: boolean
  slot: number
}


export default function InfoPage() {
  const [pokeInfo, setPokeInfo] = useState<any | undefined>();
  const [pokeAbility, setPokeAbility] = useState<string[] | undefined>()

  const { id } = useParams();
  const props: Pokemon[] | undefined = useOutletContext();

  const data = props?.find((prop) => prop?.id === Number(id));

  //포켓몬 정보 url
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`


  /** 함수들 */

  //포켓몬 기본 데이터 들고오기
  const basicInfo = useCallback(async (u: string) => {
    const info = await fetch(u).then((res) => res.json());
    const { height, weight } = info


    setPokeInfo({
      height: `${(height * 0.1).toFixed(1)}cm`,
      weight: `${(weight * 0.1).toFixed(1)}kg`
    })

  }, [url]);


  //포켓몬 url 데이터 들고오기
  const getUrlData = useCallback(async (u: string) => {
    const info = await fetch(u).then((res) => res.json());
    const { abilities } = info

    //특성 데이터 들고오기
    const abilityUrl = await abilities.map(({ ability }: AbilitiesType) => fetch(ability.url));

    const ability = await Promise.all(abilityUrl)
      .then((response) => Promise.all(response.map((res) => res.json())))
      .then((result) => result.map((r) =>
        //const text = r.flavor_text_entries.filter((r:any)=>r.language.name === 'ko' )
        // text :text[0].flavor_text
        r.names[1].name,
      ))

    setPokeAbility(ability)
  }, [url])


  useEffect(() => {
    basicInfo(url);
    getUrlData(url);
  }, [url])


  return (
    <div className={style.info}>
      {
        pokeInfo && data && pokeAbility &&
        <div>
          <h2>NO. {data.id}</h2>
          <img src={`https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/${Number(id) < 10 ? '000' : Number(id) < 100 ? '00' : '0'}${id}01.png`} width={150} alt="이미지" />
          <h2>{data.name}</h2>
          <ul className={style.type}>
            {data.type?.map((t, i) =>
              <li className={`${t}`} key={i}>{t}</li>)}
          </ul>
          <ul>
            <li>
              <p>키</p>
              <p>{pokeInfo.height}</p>
            </li>
            <li>
              <p>몸무게</p>
              <p>{pokeInfo.weight}</p>
            </li>
          </ul>
          <ul className={style.ability}>
            <p>특성</p>
            <ul>
              {
                pokeAbility?.map((a, i) =>
                  <li key={i}>
                    <p>{a}</p>
                  </li>
                )
              }
            </ul>
          </ul>
        </div>
      }
    </div>

  )
}

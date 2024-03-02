import React, { useCallback, useEffect, useState } from 'react'
import style from './component.module.scss'
import { useOutletContext, useParams } from 'react-router-dom'
import { Pokemon } from '../layout/Layout';


export default function InfoPage() {
  const { id } = useParams();
  const [pokeInfo, setPokeInfo] = useState<any | undefined>()

  const props: Pokemon[] | undefined = useOutletContext();

  const data = props?.find((prop) => prop?.id == Number(id));


  const getData = useCallback(async () => {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const info = await fetch(url).then((res) => res.json());

    const { height, weight, sprites } = info

    console.log(height, weight, sprites)

    setPokeInfo({
      height: height,
      weight: weight
    })

  }, [data])

  useEffect(() => {
    getData();
  }, [data])


  return (
    <div className={style.info}>
      {
        pokeInfo && data &&
        <div>
          <h2>{data.id}</h2>
          <img src={`https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/${Number(id) < 10 ? '000' : Number(id) < 100 ? '00' : '0'}${id}01.png`} width={200} alt="이미지" />
          <h2>{data.name}</h2>
          <ul>
            {data.type?.map((t, i) =>
              <li className={`${t}`} key={i}>{t}</li>)}
          </ul>
          <p>{pokeInfo.height}</p>
          <p>{pokeInfo.weight}</p>
        </div>

      }
    </div>

  )
}

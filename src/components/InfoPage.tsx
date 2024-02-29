import React, { useEffect, useMemo, useState } from 'react'
import style from './component.module.scss'
import { useOutletContext, useParams } from 'react-router-dom'
import { Pokemon } from '../layout/Layout';


export default function InfoPage() {
  const {id} = useParams();
  const props:Pokemon[] | undefined = useOutletContext();
  const random = Math.random();

  const [pokemon, setPokemon] = useState<Pokemon | undefined>();
  const [number, setNumber] = useState<number | undefined>();

  const data = props?.find((prop)=>prop?.id == Number(id));
  
  useEffect(()=>{
    if(props){
      setPokemon(data);
    }
  },[id,random])


  return (
    <div className={style.info}>
      {
        pokemon && 
        <div>
          <h2>{pokemon.id}</h2>
          <img src={`https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000${id}01.png`} width={200} alt="이미지" />
          <h2>{pokemon.name}</h2>
          <ul>
            {pokemon.type?.map((t,i)=>
            <li className={`${t}`} key={i}>{t}</li>)}
          </ul>
        </div>

      }
    </div>

  )
}

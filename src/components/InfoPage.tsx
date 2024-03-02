import React, { useEffect, useMemo, useState } from 'react'
import style from './component.module.scss'
import { useOutletContext, useParams } from 'react-router-dom'
import { Pokemon } from '../layout/Layout';


export default function InfoPage() {
  const {id} = useParams();
  const props:Pokemon[] | undefined = useOutletContext();

  const [pokemon, setPokemon] = useState<Pokemon | undefined>();

  
  const data = props?.find((prop)=>prop?.id == Number(id));

  useEffect(()=>{
    if(props){
      setPokemon(data);
    }
  },[id])


  return (
    <div className={style.info}>
      {
        pokemon && 
        <div>
          <h2>{pokemon.id}</h2>
          <img src={`https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/${Number(id)< 10? '000': Number(id)<100 ? '00': '0'}${id}01.png`} width={200} alt="이미지" />
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

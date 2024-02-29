import React from 'react'
import style from './component.module.scss'
import ListCard from '../layout/ListCard'
import { PokeNamesType } from '../layout/Layout'

export interface Pokemon extends PokeNamesType{
  type : string[] | undefined
} 

type PropsType = {
  pokemons : Pokemon[] | undefined
}

export default function IndexPage(props:PropsType) {
  const {pokemons} = props
 

  return (
    <div className={style.index}>
      <div className={style.search}></div>
      <div className={style.cardbox}>
        {
          pokemons && 
          pokemons.map((pokemon,i)=><ListCard key={i} {...pokemon}/>)
        }
      </div>
    </div>
  )
}

import React from 'react'
import style from './layoutstyle.module.scss'
import { useNavigate } from 'react-router-dom';
import { Pokemon } from './Layout';




export default function ListCard(props:Pokemon) {
  const navi = useNavigate();
  const {id, name, type} = props;

  return (
    <div className={style.card} onClick={()=>{navi(`/pokemon/${id}`)}}>
      <h4>{id}</h4>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} width={60} alt="이미지" />
      <span>{name}</span>
      <ul className={style.type}>
        {
          type && type.map((typ,i)=>
          <li className={`${typ}`} key={i}>{typ}</li>
          )
        }
      </ul>
    </div>
  )
}

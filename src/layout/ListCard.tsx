import React from 'react'
import style from './layoutstyle.module.scss'
import { Pokemon } from './Layout';
import { useNavigate } from 'react-router-dom';



export default function ListCard(props:Pokemon) {
  const navi = useNavigate();
  const {id, name} = props;

  return (
    <div className={style.card} onClick={()=>{navi(`/pokemon/${id}`)}}>
      <h4>{id}</h4>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} width={60} alt="이미지" />
      <span>{name}</span>
      <ul className={style.type}>
        <li>타입1</li>
        <li>타입2</li>
      </ul>
    </div>
  )
}

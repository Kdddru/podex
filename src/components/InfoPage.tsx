import React, { useCallback } from 'react'
import style from './component.module.scss'
import { useOutletContext, useParams } from 'react-router-dom'


export default function InfoPage() {
  const param = useParams();

  const {id} = param
  const props:any[] | undefined = useOutletContext();

  if(props){
    const pokemon = props.filter((i)=>i?.id == id)
    console.log(pokemon)
  }


  return (
    <div className={style.info}>
      <p>{id}</p>
    </div>
  )
}

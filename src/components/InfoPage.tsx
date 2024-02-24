import React from 'react'
import style from './component.module.scss'
import { useParams } from 'react-router-dom'


export default function InfoPage() {
  const param = useParams();

  const {id} = param


  return (
    <div className={style.info}>
      <p>{id}</p>
    </div>
  )
}

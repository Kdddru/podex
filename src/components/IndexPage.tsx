import React, { useCallback } from 'react'
import style from './component.module.scss'
import ListCard from '../layout/ListCard'
import { Pokemon } from '../layout/Layout'



type PropsType = {
  pokemons: Pokemon[] | undefined
  setNum: React.Dispatch<React.SetStateAction<number>>
}

export default function IndexPage(props: PropsType) {
  const cardbox = document.querySelector('#cardbox');
  
  const { pokemons, setNum } = props
  
  const scrollHandle = useCallback(() => {
    if (cardbox) {
      const { scrollHeight, clientHeight, scrollTop } = cardbox
      
      if (scrollHeight - clientHeight - scrollTop < 5) {
        setNum((prev) => {
          if (prev > 141) {
            return prev
          }
          return prev + 10
        }
        );
      }
    }
    
  }, [cardbox])
  
  
  cardbox?.addEventListener('scroll', scrollHandle);
  

  return (
    <div className={style.index}>
      <div className={style.search}>

      </div>
      <div className={style.cardbox} id='cardbox'>
        {
          pokemons &&
          pokemons.map((pokemon, i) => <ListCard key={i} {...pokemon} />)
        }
      </div>
    </div>
  )
}

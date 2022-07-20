import React from 'react'
import styles from './../../styles/Home.module.css'

export const Login = () => {
  let col = 12
  return (
    <div className={styles.row}>
      <div className={styles.col_1_6}>
        <div>
          <div>
            <label htmlFor="">Usiario:</label>
            <input type="text" />
          </div>
          <div >
            <label htmlFor="">Contraseña:</label>
            <input type="text" />
          </div>
        </div>
      </div>

      <img className={styles.col_6_12} src="./chat_boot/model-1.jpeg" alt="" />


    </div>
  )
}


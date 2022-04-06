import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { text } from 'stream/consumers'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>

      <main className={styles.main}>

        <form>
          <textarea rows="10" cols="50" name="comment" placeholder="Enter your News here"></textarea>
          <p>OR</p>
          <input type="file"
            id="avatar" name="avatar"
            accept="audio/mp3"></input>
        </form>


        <br></br>
        <button id="predict" >Predict</button>

      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

export default Home

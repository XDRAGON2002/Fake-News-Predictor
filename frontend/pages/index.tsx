import type { NextPage } from 'next'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from '../styles/Home.module.css'
import NavDrawer from '../components/NavDrawer';
import { useState, useEffect } from 'react';
import axios from "axios";

const Home: NextPage = () => {

  const [news,setNews] = useState("");


  const func = () => {
    axios.post('http://127.0.0.1:5000/predict', {
      news_headline: news,
    })
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  const handleTextChange = (e) => {
    setNews(e.target.value);
  }

  return (
    <div className={styles.container}>
      <NavDrawer></NavDrawer>

      <main className={styles.main}>

        <div className={styles.mainscreen}>
          <div>
            <form className={styles.inputscreen} data-testid="form">
              <TextField id="outlined-multiline-static" onChange={handleTextChange} className={styles.textfield} label="Enter your News here" multiline rows={7} placeholder="Enter your News here" />
              <p className={styles.p}>OR</p>
              <Button variant="contained" component="label" className={styles.button}>Upload<input type="file" accept="audio/mp3" hidden/> </Button>
            </form>
          </div>
          <br></br>
          <Button variant="contained" className={styles.pbutton} onClick={func}>Predict</Button>
        </div>

      </main>

    </div>
  )
}

export default Home

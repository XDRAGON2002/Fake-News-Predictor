import type { NextPage } from 'next'
import Image from 'next/image'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from '../styles/Home.module.css'
import NavDrawer from '../components/NavDrawer';
import { useState, useEffect } from 'react';
import axios from "axios";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import greentick from "../public/greentick.png";

const Home: NextPage = () => {

  const [news, setNews] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [prediction, setPrediction] = useState(false)
  const [val,setVal] = useState(0)
  const [prob,setProb] = useState(0.01)
  let result: number = 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenAlert(false)
    }, 1000);
    return () => clearTimeout(timer);
  }, [openAlert]);


  const func = async () => {
    let response = await axios.post('http://127.0.0.1:5000/predict', {
      news_headline: news,
    })

    console.log(response);
    result = response.data.data
    if (result === 0) {
      setProb(1 - response.data.prob)
    }
    else {
      setProb(response.data.prob)
    }
    setProb(prob * 100)
    console.log(prob)
    let updatedprob = result===0 ? (1-response.data.prob)*100 : (response.data.prob*100);
    console.log("updated prob: "+updatedprob) 
    setProb(updatedprob)
    if (updatedprob > 70) {
      setVal(1);
    }
    else if (updatedprob > 40) {
      setVal(2);
    }
    else {
      setVal(3);
    }

    console.log(val)
    setPrediction(true)
  }

  const alert = () => {
    setOpenAlert(true)
  }

  const handleTextChange = (e) => {
    setNews(e.target.value);
  }

  return (
    <div className={styles.container}>
      <NavDrawer />

      <main className={styles.main}>

        <div className={styles.mainscreen}>
          <div>
            <form className={styles.inputscreen} data-testid="form">
              <TextField id="outlined-multiline-static" onChange={handleTextChange} className={styles.textfield} label="Enter your News here" multiline rows={7} placeholder="Enter your News here" />
              <p className={styles.p}>OR</p>
              <Button variant="contained" component="label" className={styles.button} onClick={alert}>Upload</Button>
            </form>
          </div>
          <br></br>
          <div><Button variant="contained" className={styles.pbutton} onClick={func}>Predict</Button></div>
          {
            val === 1 && <div className={styles.predictionBox}><img src="greentick.png" width={50} height={50} /> <p>&nbsp;&nbsp;The Authenticity of the news is {prob.toPrecision(4)} %</p> </div>
          }
          {
            val === 2 && <div className={styles.predictionBox}><img src="exclaimation.png" width={50} height={50} /> <p>&nbsp;&nbsp;The Authenticity of the news is {prob.toPrecision(4)} %</p></div>
          }
          {
            val === 3 && <div className={styles.predictionBox}><img src="wrong.png" width={50} height={50} /> <p>&nbsp;&nbsp;The Authenticity of the news is {prob.toPrecision(4)} %</p></div>
          }
        </div>

        <Collapse in={openAlert}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
            severity="info"
          >
            This feature is under development
          </Alert>
        </Collapse>

      </main>

    </div>
  )
}

export default Home

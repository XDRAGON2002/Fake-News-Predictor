import type { NextPage } from 'next'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from '../styles/Home.module.css'
import NavDrawer from '../components/NavDrawer';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <NavDrawer></NavDrawer>

      <main className={styles.main}>

        <div className={styles.mainscreen}>
          <div>
            <form className={styles.inputscreen}>
              <TextField id="outlined-multiline-static" className={styles.textfield} label="Enter your News here" multiline rows={7} placeholder="Enter your News here" />
              <p className={styles.p}>OR</p>
              <Button variant="contained" component="label" className={styles.button}>Upload<input type="file" accept="audio/mp3" hidden/> </Button>
            </form>
          </div>
          <br></br>
          <Button variant="contained" className={styles.pbutton}>Predict</Button>
        </div>

      </main>

    </div>
  )
}

export default Home

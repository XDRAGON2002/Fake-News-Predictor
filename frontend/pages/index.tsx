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
              <TextField id="outlined-multiline-static" label="Enter your News here" multiline rows={7} placeholder="Enter your News here" />
              <p>OR</p>
              <Button variant="contained" component="label">Upload File <input type="file" accept="audio/mp3" hidden/> </Button>
            </form>
          </div>
          <br></br>
          <Button variant="contained" className={styles.button}>Predict</Button>
        </div>

      </main>

    </div>
  )
}

export default Home

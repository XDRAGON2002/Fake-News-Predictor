import Link from "next/link";
import styles from '../styles/Home.module.css';
import { Typography, Button } from '@mui/material';

const Article = ({ data }) => {
    const title = String(data["title"]).split("-")
    console.log(title);
    return (
        <div className={styles.cont}>
            <div className={styles.article}>
                <div>
                <br />
                <div >
                    <Typography className={styles.articletitle}>{data["title"]}</Typography>
                    <Link href={data["url"]}><Button className={styles.articlebutton} variant="contained">Read More...</Button></Link>
                    
                </div>

                <br />
                <br /> 
                </div>
                {/* <span>{data["source"]["name"]}</span> */}
                <div className={styles.rhs}>
                    <div className={styles.authenticity}>Authenticity of news</div>
                    
                
                <Button variant="contained" className={styles.authenticitybutton}>{"val"}</Button>
                </div>
            </div>
            
        </div>
    );
};

export default Article;

import Link from "next/link";
import styles from '../styles/Home.module.css';
import { Typography, Button } from '@mui/material';
import headlineFormatter from '../utils/headlineFormat';

const Article = ({ data }) => {
    const title = headlineFormatter(String(data["title"]))
    return (
        <div className={styles.cont}>
            <div className={styles.article}>
                <div>
                <br />
                <div >
                    <Typography gutterBottom variant="h5" className={styles.articletitle} data-testid="title">{title.headline}</Typography>
                    <Typography className={styles.articletitle} data-testid="author">{title.author}</Typography>
                    <a href={data["url"]}><Button className={styles.articlebutton} variant="contained" data-testid="read-more">Read More...</Button></a>
                    
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

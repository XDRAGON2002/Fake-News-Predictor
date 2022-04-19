import Link from "next/link";
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Typography, Button } from '@mui/material';
import headlineFormatter from '../utils/headlineFormat';

const Article = ({ data }) => {

    const [prob, setprob] = useState(0)
    // const [result, setresult] = useState("0 %")

    const title = headlineFormatter(String(data["title"]))
    let result:number = 0;

    const func = () => {
        axios.post('http://127.0.0.1:5000/predict', {
            news_headline: title.headline,
        })
            .then((response) => {
                console.log(response);
                result = response.data.result
                if (result == 0) {
                    setprob(100 - response.data.prob)
                }
                else {
                    setprob(response.data.prob)
                }
                // console.log(prob)
            }, (error) => {
                console.log(error);
            });
    }



    // useEffect( () => {
    //     (async () => {
    //         await axios.post('http://127.0.0.1:5000/predict', {
    //             news_headline: title.headline,
    //         })
    //         .then((response) => {
    //             console.log(response);
    //             setprob(response.data.prob)
    //             console.log(prob)
    //         }, (error) => {
    //             console.log(error);
    //         });
    //       setprob(prob);
    //       setresult(String(prob*100)+" %");
    //     })
    // },[])


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

                    {
                        prob == 0 ? <div><Button variant="contained" className={styles.authenticitybutton} onClick={func}>Predict</Button></div> : <Button variant="contained" className={styles.authenticitybutton}>{prob.toPrecision(4) * 100} %</Button>
                    }

                </div>
            </div>

        </div>
    );
};

export default Article;

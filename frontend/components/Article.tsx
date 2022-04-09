import Link from "next/link";
import styles from '../styles/Home.module.css';

const Article = ({ data }) => {
    console.log(data["url"]);
    return (
        <div className={styles.article}>
            {/* <span>{data["source"]["name"]}</span> */}
            <br />
            <div className={styles.articlelist}>
                <Link href={data["url"]}>
                    <a>
                        <span className={styles.articletitle}>{data["title"]}</span>
                    </a>
                </Link>
            </div>

            <br />
            <br />
        </div>
    );
};

export default Article;

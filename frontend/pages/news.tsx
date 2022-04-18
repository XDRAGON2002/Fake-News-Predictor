import ArticlesList from "../components/ArticlesList"
import styles from '../styles/Home.module.css'

const News = () => {
  return (
    <div className={styles.newsContainer} data-testid="news">
        <ArticlesList/>
    </div>
  )
}

export default News
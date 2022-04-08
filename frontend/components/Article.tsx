import Link from "next/link";

const Article = ({ data }) => {
    console.log(data["url"]);
    return (
        <div>
            <span>{data["source"]["name"]}</span>
            <br />
            <Link href={data["url"]}>
                <span>{data["title"]}</span>
            </Link>

            <br />
            <br />
        </div>
    );
};

export default Article;

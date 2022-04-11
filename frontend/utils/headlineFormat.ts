interface res{
    headline:string,
    author:string
}
const headlineFormatter = (title:string):res =>{
    let temp:string [] =title.split("-") 
    let _headline:string=""
    for(let i=0;i<temp.length-1;i++){
        _headline=_headline.concat(temp[i])
        _headline=_headline+"-"
    }
    let data :res={
        headline:_headline.slice(0,_headline.length-2),
        author:temp[temp.length-1]
    }
    return data
}

export default headlineFormatter
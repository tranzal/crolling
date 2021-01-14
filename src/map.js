import React, {useEffect,useState} from 'react';

const Map = ({rank,movie}) =>{
    const [total,setTotal] = useState();
    const [bool,setBool] =useState(false);
    useEffect(()=>{
        tot();
    },[]);
    console.log(total);
    const tot = () =>{
        let array = [];
        for(let x=0;x<rank.length;x++){
            for(let y=0;y<movie.length;y++){
                if(rank[x].titleURL===movie[y].titleURL){
                    array[x]={
                        titleURL:rank[x].titleURL,
                        title:movie[y].title,
                        rank:rank[x].rankURL,
                        gerne:movie[y].gerne
                    }
                }
            }
        }
        setTotal(array);
        setBool(true);
    };


return (
    <table>
        <tbody>
        <tr>
            <th>등수</th>
            <th>제목</th>
            <th>장르</th>
        </tr>
        {bool && total.map((d,i) =>
            <tr key={i}>
                <td><img src={d.rank} alt={"rank"}/></td>
                <td>{d.title}</td>
                <td>{d.gerne}</td>
            </tr>
        )}
        </tbody>
    </table>

);


}

export default Map;
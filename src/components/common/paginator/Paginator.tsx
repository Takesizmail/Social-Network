import React, {useState} from 'react';
import s from './something.module.css'

type Props  = {
    totalItemsCount:number,
    pageSize:number,
    currentPage:number,
    onPageChanged: (pageNumber:number)=> void,
    portionsSize: number
}


const Paginator: React.FC<Props> = ({totalItemsCount,pageSize,currentPage,onPageChanged, portionsSize=10}) => {

    let [portionNumber,setPortionNumber] = useState(1);

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount/portionsSize)

    let leftPortionPageNumber = (portionNumber -1) * portionsSize;
    let rightPortionPageNumber = portionNumber * portionsSize +1;

    return (
        <div className={s.paginatorContainer}>
            { portionNumber > 1 &&
            <button
                onClick={()=> setPortionNumber(portionNumber -1)}
                className={s.paginatorButton}
            > step  </button>
            }
    <div>
        {pages.filter(e => e>leftPortionPageNumber && e< rightPortionPageNumber)
            .map(p => {

            return <span className={`${currentPage === p && s.selectedPage} ${s.numberPage} `}
                         onClick={(e) => {
                             onPageChanged(p);
                         }}>{p}</span>
        })}
    </div>

                {  portionCount > portionNumber  &&
                <button onClick={()=> setPortionNumber(portionNumber +1)}
                        className={s.paginatorButton}
                > next  </button>
                }


        </div>
    )




}

export default Paginator;
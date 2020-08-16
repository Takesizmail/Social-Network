import React, {useState} from 'react';
import s from "./Paginator.module.css"

const Paginator = ({totalItemsCount,pageSize,currentPage,onPageChanged, portionsSize=10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount/portionsSize)
    let [portionNumber,setPortionNumber] = useState(1);
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
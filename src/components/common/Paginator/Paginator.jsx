import React, {useState} from 'react'
import styles from './Paginator.module.css'

let Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
	let pagesCount = Math.ceil(totalUsersCount / pageSize);
	let pages = [];

	let portionCount = Math.ceil(pagesCount / portionSize);
	let [portionNumber, setPortionNumber] = useState(1);
	let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
	let rightPortionPageNumber = portionNumber * portionSize;

	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}

	let onChangePortionNumber = (type) => {
		if(type === 'prev') {
			if(leftPortionPageNumber == currentPage){
				setPortionNumber(portionNumber - 1)
			}
			onPageChanged(currentPage-1)
		} else if(type === 'next'){
			if(rightPortionPageNumber == currentPage){
				setPortionNumber(portionNumber + 1)
			}
			onPageChanged(currentPage+1)
		}
	}

	return (
		<div className={styles.pagination}>
			{portionNumber > 1 &&
			<a href={null} onClick={() => {
				onChangePortionNumber('prev')
			}} className={styles.pagination__button}> Prev </a>}

			{pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map(p => {
				return (
					<span onClick={() => {
						onPageChanged(p)
					}} key={p} className={currentPage === p ? styles.active : ''}>{p}</span>
				)
			})}

			{portionCount > portionNumber && <a href={null} onClick={() => {
				onChangePortionNumber('next')
			}} className={styles.pagination__button}> Next </a>}
		</div>
	)
}

export default Paginator

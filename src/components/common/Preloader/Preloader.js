import React from 'react'
import preloader from "../../../assets/images/preloader.gif";
import s from './Preloader.css'

let Preloader = () => {
	return(
		<div className={s.preloader}>
			<img src={preloader} />
		</div>
	)
}

export default Preloader
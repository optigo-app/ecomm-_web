import React from 'react'
import './TheDifference.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'

const TheDifference = () => {

    return (
        <div  className='mala_smilingPAgeMain'>
            <div className='mala_smilingPAgeMain_one'>
                <img className="simple_card_gif " src={`${storImagePath()}/images/HomePage/gif1.gif`} alt="" />
            </div>
            <div className='mala_smilingPAgeMain_two'>
                <img className="simple_card_gif" src='https://malakan.com/wp-content/uploads/2024/04/Hompage-Ring-New-Large.gif' alt="" />
            </div>
        </div>
    )
}

export default TheDifference
import React from 'react'
import './TheDifference.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'

const TheDifference = () => {

    return (
        <div style={{ paddingTop: '7px' }} className='mala_smilingPAgeMain'>
            <div className='mala_smilingPAgeMain_one'>
                <img className="simple_card_gif " src={`${storImagePath()}/images/HomePage/gif1.gif`} alt="" />
            </div>
            <div className='mala_smilingPAgeMain_two'>
                <img className="simple_card_gif" src='https://malakan.com/wp-content/uploads/2024/04/Hompage-Ring-New-Large.gif' alt="" />
            </div>

            {/* <p className='stam_smilingTitle'>The Malakan Difference</p>
            <div className='smilingRock'>
                <div className='smilingRockBox'>
                    <div className='smilingRockBoxSub1'>
                        <img className="simple-card__img " src={`${storImagePath()}/images/HomePage/TheDifference/TheDifference1.webp`} alt="" />
                    </div>
                    <div className='smilingRockBoxSub2'>
                        <p className='smilingBoxName'>Natural Diamond & jewellery</p>
                        <p className='learnMore'>LEARN MORE</p>
                    </div>
                </div>
                <div className='smilingRockBox'>
                    <div className='smilingRockBoxSub1'>
                        <img class="simple-card__img " src={`${storImagePath()}/images/HomePage/TheDifference/TheDifference2.webp`} alt="" />
                    </div>
                    <div className='smilingRockBoxSub2'>

                        <p className='smilingBoxName'>1% of each purchase goes to your choice of charity</p>
                        <p className='learnMore'>LEARN MORE</p>
                    </div>

                </div>
                <div className='smilingRockBox'>
                    <div className='smilingRockBoxSub1'>
                        <img class="simple-card__img " src={`${storImagePath()}/images/HomePage/TheDifference/TheDifference3.webp`} alt="" />
                    </div>
                    <div className='smilingRockBoxSub2'>

                        <p className='smilingBoxName'>Laser inscribed diamonds with Sonasons logo</p>
                        <p className='learnMore'>LEARN MORE</p>
                    </div>

                </div>
                <div className='smilingRockBox'>
                    <div className='smilingRockBoxSub1'>
                        <img class="simple-card__img "src={`${storImagePath()}/images/HomePage/TheDifference/TheDifference4.webp`} alt="" />
                    </div>
                    <div className='smilingRockBoxSub2'>
                        <p className='smilingBoxName'>ECG+ Certified Brand Butterfly Mark</p>
                        <p className='learnMore'>LEARN MORE</p>
                    </div>

                </div>
            </div> */}
        </div>
    )
}

export default TheDifference
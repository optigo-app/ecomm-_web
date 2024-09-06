import React, { useEffect } from 'react';
import './Career.scss'
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';

const Career = () => {
    const careerDetails = [
        { title: 'Lorem Ipsum', desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor congue magna, id mollis mi sollicitudin in. Fusce facilisis, felis vel viverra placerat, felis neque lacinia urna, a tempor risus nulla in lorem." },
        { title: 'Lorem Ipsum', desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor congue magna, id mollis mi sollicitudin in. Fusce facilisis, felis vel viverra placerat, felis neque lacinia urna, a tempor risus nulla in lorem." },
        { title: 'Lorem Ipsum', desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor congue magna, id mollis mi sollicitudin in. Fusce facilisis, felis vel viverra placerat, felis neque lacinia urna, a tempor risus nulla in lorem." },
        { title: 'Lorem Ipsum', desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor congue magna, id mollis mi sollicitudin in. Fusce facilisis, felis vel viverra placerat, felis neque lacinia urna, a tempor risus nulla in lorem." },
        { title: 'Lorem Ipsum', desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor congue magna, id mollis mi sollicitudin in. Fusce facilisis, felis vel viverra placerat, felis neque lacinia urna, a tempor risus nulla in lorem." },
    ];

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <div className="elv_career_main_div">
            <div className="elv_career_div">
                <div className='elv_career_image_div'>
                    <img className='elv_career_image_1' src={`${storImagePath()}/images/HomePage/Careers/mainTopBanner.jpg`} alt="career.jpg" />
                    <div>
                        <img className='elv_career_image_2' src="https://www.elvee.in/static/media/Logo1.4e98fceb0f4280d06296.png" alt="" />
                    </div>
                </div>
                <div className='elv_career_descriptions_div'>
                    <h3 className='elv_career_head_title'>Careers at Elvee Jewels</h3>
                    <div className='elv_career_desc'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor congue magna, id mollis mi sollicitudin in. Fusce facilisis, felis vel viverra placerat, felis neque lacinia urna, a tempor risus nulla in lorem.</p>

                        {careerDetails?.map((item, index) => (
                            <div key={index} className='mt-5'>
                                <span className='elv_career_title_main'>{item?.title}</span>
                                <p className='elv_career_para_main'>
                                    {item?.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Career;
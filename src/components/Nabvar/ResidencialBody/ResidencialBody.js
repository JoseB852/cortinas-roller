import React, { useEffect, useState } from 'react'
import '../ComercialBody/ComercialBody.css'
import { FaUserTie, FaHeadset } from "react-icons/fa";
import Card from '../../../views/Card/Card';

export default function ResidencialBody() {



    const iconMap = {
        user: <FaUserTie />,
        support: <FaHeadset />
    };

    const [residencial, setResidnecial] = useState([])

    const getResidnecial = () => {
        return fetch('/data/residencial.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((data) => {
                console.log(data)
                return data
            })
            .catch((error) => {
                console.error("Error al obtener los datos", error)
            })

    }

    useEffect(() => {
        getResidnecial().then(data => {
            setResidnecial(data);
        });
    }, [])
    return (
        <>
            <Card />

            <h1>DISEÑADO EXCLUSIVAMENTE PARA TI</h1>
            <div className='comercial-body'>


                {
                    residencial.map((content) => (
                        <div className='body-one' key={content.id}>

                            <div className="icon">
                                {iconMap[content.icon]}
                            </div>

                            <h1>{content.titulo}</h1>
                            <p>{content.text}</p>

                        </div>
                    ))
                }
            </div>


        </>

    )
}

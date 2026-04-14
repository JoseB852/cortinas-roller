import React, { useEffect, useState } from 'react'
import './ComercialBody.css'
import { FaDollarSign, FaSun, FaCheckCircle, FaShieldAlt } from "react-icons/fa";

export default function ComercialBody() {

    const [body, setBody] = useState([]);

    const iconMap = {
        dollar: <FaDollarSign />,
        sun: <FaSun />,
        check: <FaCheckCircle />,
        shield: <FaShieldAlt />
    };

    const getBody = () => {
        return fetch('/data/body.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch((error) => {
                console.error("Error al obtener los datos", error);
            });
    };

    useEffect(() => {
        getBody().then(data => {
            setBody(data);
        });
    }, []);

    return (
        <>
            <h1 className='text-tiltle'>¿POR QUÉ LAS EMPRESAS?</h1>

            <div className='comercial-body'>
                {
                    body.map((content) => (
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
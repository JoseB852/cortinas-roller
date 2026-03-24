import React, { useEffect, useState } from 'react'
import './ComercialBody.css'

export default function ComercialBody() {

    const [body, setBody] = useState([]);

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
            <h1>DISEÑADO EXCLUSIVAMENTE PARA TI</h1>
            <div className='comercial-body'>
                {
                    body.map((content) => (
                        <div className='body-one' key={content.id}>
                            <h1>{content.titulo}</h1>
                            <p>{content.text}</p>
                        </div>


                    ))
                }

            </div>
        </>
    )

}

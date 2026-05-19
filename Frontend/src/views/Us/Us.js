import React from 'react'
import './Us.css'

export default function Us() {
    return (
        <div className='content-us'>
            <div className='title-us'>
                <h1>Nosotros</h1>
            </div>
            <div className='description-us'>
                <p>En Cortinas Lenox creemos que cada espacio es una expresión de estilo y sofisticación. Diseñamos cortinas roller a medida que fusionan estética, innovación y funcionalidad, elevando la experiencia del hogar a un nuevo estándar.</p>

                <p>Acompañamos a nuestros clientes desde una asesoría personalizada hasta una instalación impecable, cuidando cada detalle con precisión y excelencia. Nuestra exclusiva selección de telas y sistemas inteligentes transforma la luz, crea atmósferas y redefine la manera en que se habita cada espacio.</p>

                <p>Más que cortinas, creamos ambientes que inspiran elegancia, confort y distinción.</p>
            </div>
            <div className='cube-content'>

    <div className='cube-one'>
        <div className='cube-normal'>
            <h3>Roller Screen</h3>
        </div>
        <div className='cube-info'>
            <h3>Control de Luz</h3>
            <p>Permiten el paso de luz natural sin perder privacidad. 
               Ideales para salas y oficinas modernas.</p>
        </div>
    </div>

    <div className='cube-two'>
        <div className='cube-normal'>
            <h3>Blackout</h3>
        </div>
        <div className='cube-info'>
            <h3>Oscuridad Total</h3>
            <p>Bloquean hasta el 100% de la luz. 
               Perfectas para dormitorios y espacios de descanso.</p>
        </div>
    </div>

    <div className='cube-three'>
        <div className='cube-normal'>
            <h3>Motorizadas</h3>
        </div>
        <div className='cube-info'>
            <h3>Tecnología Smart</h3>
            <p>Sistema automatizado con control remoto o 
               integración inteligente para mayor comodidad.</p>
        </div>
    </div>

</div>

        </div>
    )
}

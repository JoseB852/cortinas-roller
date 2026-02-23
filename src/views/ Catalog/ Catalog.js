import React from 'react'
import './ Catalog.css'

export default function  Catalog() {
  return (
    <div> 
        <section className='main-content'>
            <aside className='filter'>
                <h2>Filtros</h2>
                <div className='filters-category'>
                    <div className='filter-category'>
                        <h3>Categorias</h3>
                        <label>
                            <input type='checkbox' />
                            <span>Blackout</span>
                        </label>
                        <label>
                            <input type='checkbox' />
                            <span>Blackout-1</span>
                        </label>
                        <label>
                            <input type='checkbox' />
                            <span>Blackout-2</span>
                        </label>
                    </div>
                    <div className='filter-category'>
                        <h3>Tipos</h3>
                        <label>
                            <input type='checkbox' />
                            <span>Dual</span>
                        </label>
                        <label>
                            <input type='checkbox' />
                            <span>Roller-1</span>
                        </label>
                        <label>
                            <input type='checkbox' />
                            <span>Roller-2</span>
                        </label>
                    </div>
                </div>

            </aside>
        </section>
    </div>
  )
}

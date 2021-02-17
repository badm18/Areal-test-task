import React from 'react'
import Card from 'react-bootstrap/Card'
import '../ComponentsCss/Card.css'
import { ModalInfo } from './DetailedInfo'


export const Cards = ({ data }) => {

    return (
        <div className="cardArea">

            {data.map((item) =>

                <Card style={{ width: '10rem' }} key={item.id}>
                    <Card.Img variant="top" alt="Фоновое изображение пользователя" src={item.avatar} />
                    <Card.Body className='cardBody'>
                        <Card.Title>{item.first_name} {item.last_name}</Card.Title>
                        <ModalInfo userId={item.id} /> {/* //кнопка открывающая модальное окно */}
                    </Card.Body>
                </Card>


            )}

        </div>
    )

}
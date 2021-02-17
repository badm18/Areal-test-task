import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import '../ComponentsCss/DetailedInfo.css'

export const ModalInfo = ({ userId }) => {

    const [show, setShow] = useState(false);
    const [userInfo, setUserInfo] = useState({})

    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

        if (show) {

            let url = new URL(`http://localhost:5000/get/${userId}`)

            fetch(url)
                .then(res => res.json())
                .then(res => {
                    if (res != userInfo) { //если данные совпадают, то обновления userInfo не происходит
                        setUserInfo(res)
                    }
                })
                .catch(err => alert(err))
        }

    }, [show])


    return (
        <>
            <Button variant="primary" onClick={handleShow}>Подробнее</Button>

            <Modal show={show} onHide={handleClose} size='lg'>

                <Modal.Header closeButton>
                    <Modal.Title>{userInfo.first_name} {userInfo.last_name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="modalInfo">
                        <div className="userImg">
                            <img src={userInfo.avatar} alt="Фоновое изображение пользователя" id="userImg" />
                        </div>
                        <div className="userInfo">
                            <p>Имя: {userInfo.first_name}</p>
                            <p>Фамилия: {userInfo.last_name}</p>
                            <p>email: {userInfo.email}</p>
                            <p>Пол: {userInfo.gender}</p>
                            <p>Должность: {userInfo.job}</p>
                            <p>Университет: {userInfo.university}</p>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
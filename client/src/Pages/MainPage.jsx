import React, { useEffect, useState } from 'react'
import { Cards } from '../Components/Card'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import '../PagesCss/MainPage.css'



export const MainPage = () => {

    const [data, SetData] = useState([])
    const [currentPage, setPage] = useState(1)
    const [inputVal, setVal] = useState('')
    const [msgStyle, setMsgStyle] = useState({ visibility: 'hidden' })
    const [btnStyle, setBtnStyle] = useState({ visibility: 'hidden' })
    const [bottomStyle,setBottom]= useState({ visibility: 'visible' }) //блок с переключением страниц убирается если пользователь найден
    const [loading, setLoading] = useState(false)
    const [noDatanext, setNoData] = useState(false) //если достигнута последняя страница значение становиться true
  

    useEffect(() => {
        getData(0) //загрузка карточек когда страница открывается в первый раз
    }, [])


    const nextPage = () => {
        if (!noDatanext) {
            getData(1)
        }
    }

    const prevPage = () => {
        if (currentPage - 1 > 0) {
            getData(-1)
        }
    }

    const showMessage = () => { //функция вывода сообщения если пользователь не найден

        setMsgStyle({ visibility: 'visible' })

        setTimeout(() => {
            setMsgStyle({ visibility: 'hidden' })
        }, 3000)
    }

    const findUser = () => {

        let url = new URL('http://localhost:5000/findCard')
        let params = { lastName: inputVal } //параметры которые нужно передать в запросе серверу
        url.search = new URLSearchParams(params).toString() //формирование url с запросом

        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.length !== 0) {
                    setBottom({ visibility: 'hidden' })
                    setBtnStyle({ visibility: 'visible' }) //появляется кнопка для возвращения к просмотру карточек
                    SetData(res);
                } else {
                    showMessage()
                }
                setVal('')
            })
            .catch(err => alert(err))
    }

    const getData = (page) => {

        let url = new URL('http://localhost:5000/')
        let params = { page: currentPage + page } //параметры которые нужно передать в запросе серверу
        url.search = new URLSearchParams(params).toString() //формирование url с запросом

        setLoading(true)

        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.length !== 0) {
                    SetData(res);
                    setPage(currentPage + page) //currentPage меняется только если на след-пред-ей страницах есть данные 
                    setNoData(false)
                } else {
                    setNoData(true)
                }
                setLoading(false)
            })
            .catch(err => alert(err))
    }


    return (


        <div className="App">

            <div className="top">

                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Введите фамилию пользователя"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        pattern="/[A-Za-z]/ig"
                        value={inputVal}
                        onChange={e => setVal(e.target.value.replace(/[^A-Za-z ]+/, ''))} //защита от ввода цифр и кириллицы
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={findUser}>Найти</Button>
                    </InputGroup.Append>
                </InputGroup>


                <div className="responsInfo" style={msgStyle}>
                    <p><strong>Нужный пользователь не найден</strong></p>
                </div>


                <Button
                    variant="primary"
                    style={btnStyle}
                    onClick={() => {
                        setBtnStyle({ visibility: 'hidden' })
                        setBottom({ visibility: 'visible' })
                        getData(0)
                    }}
                >Список карточек</Button>
            </div>

            {loading ?
                <div className="middle">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
                :
                <div className="middle">
                    <Cards data={data} />
                </div>
            }

            <div className="bottom" style={bottomStyle}>

                <svg viewBox="0 0 14 18" className="prev" width='20px' height='20px' onClick={prevPage} >
                    <path d="M.827.086A.537.537 0 0 0 0 .538v16.206c0 .425.47.682.827.453l12.618-8.104a.538.538 0 0 0 0-.905z"></path>
                </svg>

                <p className='photoLength'>Страница №{currentPage}</p>

                <svg viewBox="0 0 14 18" className="next" width='20px' height='20px' onClick={nextPage}>
                    <path d="M.827.086A.537.537 0 0 0 0 .538v16.206c0 .425.47.682.827.453l12.618-8.104a.538.538 0 0 0 0-.905z"></path>
                </svg>


            </div>

        </div>
    );

}
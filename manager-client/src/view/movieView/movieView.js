import Header from "../../components/header/header";
import React, {useEffect, useState} from "react";
import MovieStore from "../../store/movieStore/movieStore";
import "./movieView.css"
import {observer} from "mobx-react-lite";

const Movie = () => {

    const {
        movies,
        getMovies,
        createMovie,
        updateMovie,
        deleteMovie
    } = MovieStore

    // Состояние страницы, что показывать Фильмы или Сериалы
    const [isMovie, setIsMovie] = useState(true)

    // Состояние переключателей в редакторе
    const [inputIsMovie, setInputIsMovie] = useState(true)
    const [inputIsViewed, setInputIsViewed] = useState(true)

    // Состояние полей в редакторе
    const [inputName, setInputName] = useState("")
    const [inputYear, setInputYear] = useState("")
    const [inputSeasons, setInputSeasons] = useState("")
    const [inputDescription, setInputDescription] = useState("")

    // Выбранный фильм
    const [selectedMovie, setSelectedMovie] = useState(-1)

    // Выбранная сортировка
    // 0/1 = по дате добавления убывание/возрастание
    // 2/3 = по названию убывание/возрастание
    // 4/5 = по году выпуска убывание/возрастание
    const [sortType, setSortType] = useState(2)

    // загружаем список фильмов и сериалов при загрузке страницы
    useEffect(() => {
        getMovies().then();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const resetInput = () => {
        setInputName("")
        setInputYear("")
        setInputSeasons("")
        setInputDescription("")
    }

    const addClick = async () => {
        await createMovie(inputName, inputIsMovie, inputIsViewed, inputYear, inputDescription, inputSeasons).then()
        resetInput()
        await getMovies().then()
    }

    const updateClick = async () => {
        await updateMovie(selectedMovie, inputName, inputIsMovie, inputIsViewed, inputYear, inputDescription, inputSeasons).then()
        resetInput()
        await getMovies().then()
    }

    const deleteClick = async () => {
        await deleteMovie(selectedMovie).then()
        resetInput()
        await getMovies().then()
    }

    const setSelectedTr = (el) => {
        setSelectedMovie(el.id)

        setInputName(el.name)
        setInputYear(el.year)
        setInputSeasons(el.seasons)
        setInputDescription(el.description)
        setInputIsMovie(el.isMovie)
        setInputIsViewed(el.isViewed)

    }

    const sortFunc = (a, b) => {
        switch (sortType) {
            case 0:
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                // a должно быть равным b
                return 0;
            case 1:
                if (a.name < b.name) {
                    return 1;
                }
                if (a.name > b.name) {
                    return -1;
                }
                // a должно быть равным b
                return 0;
            case 2:
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                // a должно быть равным b
                return 0;
            case 3:
                if (a.name < b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                // a должно быть равным b
                return 0;
            case 4:
                return a.year - b.year;
            case 5:
                return b.year - a.year;
            default:
                return a.id - b.id;
        }
    }

    return (
        <div className="movie">
            <Header />
            <div className="movie__content">
                <div className="editor">
                    <div className="editor__isMovie">
                        <button className="editor__isMovie__button" onClick={()=>{setIsMovie(true); resetInput(); setSelectedMovie(-1)}}>Фильмы</button>
                        <button className="editor__isMovie__button" onClick={()=>{setIsMovie(false); resetInput(); setSelectedMovie(-1)}}>Сериалы</button>
                    </div>
                    <div className="editor__input-block">
                        <div className="editor__input-block__inner">
                            Название: <input value={inputName}   onChange={(event) => {setInputName(event.target.value)}} className="editor__input-block__input-name" type="text" placeholder="Название" />
                            Год выхода: <input value={inputYear}   onChange={(event) => {setInputYear(event.target.value)}} className="editor__input-block__input-year" type="text" placeholder="Год" />
                            {!isMovie ? <>
                                Сезон: <input value={inputSeasons}   onChange={(event) => {setInputSeasons(event.target.value)}} className="editor__input-block__input-seasons" type="text" placeholder="Сезон" />
                            </> : <></>}
                        </div>
                        Описание: <input value={inputDescription}   onChange={(event) => {setInputDescription(event.target.value)}} className="editor__input-block__input-description" type="text" placeholder="Описание" />
                    </div>
                    <div className="editor__button-block">
                        <button className="standard-button green" onClick={addClick}>Создать</button>
                        <button className="standard-button blue" onClick={updateClick}>Обновить</button>
                        <button className="standard-button red" onClick={deleteClick}>Удалить</button>
                        <button className="standard-button" onClick={()=> {setInputIsMovie(!inputIsMovie)}}>{inputIsMovie ? "Фильм" : "Сериал"}</button>
                        <button className="standard-button" onClick={()=> {setInputIsViewed(!inputIsViewed)}}>{inputIsViewed ? "Просмотрен" : "Хочу посмотреть"}</button>
                        <button className="standard-button" onClick={resetInput}>Очистить поля</button>
                    </div>
                </div>
                <div className="movie-block">
                    <div className="movie-block__list">
                        <h2>Просмотренные</h2>
                        <table className="viewed-table">
                            <thead>
                            <tr>
                                <th onClick={() => {sortType === 0 ? setSortType(1) : setSortType(0)}}>Добавлено</th>
                                <th onClick={() => {sortType === 2 ? setSortType(3) : setSortType(2)}}>Название</th>
                                <th onClick={() => {sortType === 4 ? setSortType(5) : setSortType(4)}}>Год</th>
                                <th>Описание</th>
                                {!isMovie ? <th>Сезон</th> : <></>}
                            </tr>
                            </thead>
                            <tbody>
                            {movies
                                .filter((el) => el.isMovie === isMovie)
                                .filter((el) => el.isViewed)
                                .sort((a, b) => sortFunc(a, b))
                                .map((el) => (
                                    <tr key={`movie${el.id}`} onClick={() => setSelectedTr(el)} className={selectedMovie === el.id ? "selectedTr" : ""}>
                                        <td>
                                            {el.createdAt.substr(0, 10)}
                                        </td>
                                        <td>
                                            {el.name}
                                        </td>
                                        <td>
                                            {el.year}
                                        </td>
                                        <td>
                                            {el.description}
                                        </td>
                                        {!isMovie ? <td>{el.seasons}</td> : <></>}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="movie-block__list">
                        <h2>Хочу посмотреть</h2>
                    <table className="wishlist-table">
                        <thead>
                        <tr>
                            <th onClick={() => {sortType === 0 ? setSortType(1) : setSortType(0)}}>Добавлено</th>
                            <th onClick={() => {sortType === 2 ? setSortType(3) : setSortType(2)}}>Название</th>
                            <th onClick={() => {sortType === 4 ? setSortType(5) : setSortType(4)}}>Год</th>
                            <th>Описание</th>
                            {!isMovie ? <th>Сезон</th> : <></>}
                        </tr>
                        </thead>
                        <tbody>
                        {movies
                            .filter((el) => el.isMovie === isMovie)
                            .filter((el) => !el.isViewed)
                            .sort((a, b) => sortFunc(a, b))
                            .map((el) => (
                                <tr key={`movie${el.id}`} onClick={() => setSelectedTr(el)} className={selectedMovie === el.id ? "selectedTr" : ""}>
                                    <td>
                                        {el.createdAt.substr(0, 10)}
                                    </td>
                                    <td>
                                        {el.name}
                                    </td>
                                    <td>
                                        {el.year}
                                    </td>
                                    <td>
                                        {el.description}
                                    </td>
                                    {!isMovie ? <td>{el.seasons}</td> : <></>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(Movie);
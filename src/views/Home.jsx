import React, { useState, useEffect } from 'react';
import Header from "../components/header/Header";
import api from "../api/index";

function Home() {
    const [lista, addList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/album').then((res) => {
                    return res.data.data;
                });

                addList(response);
            } catch (error) {
                console.error('Erro ao buscar o nome:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Função para fazer a chamada à API usando Axios
        const fetchData = async () => {
            try {
                const response = await api.get('/album').then((res) => {
                    return res.data.data;
                });
                
                addList(response);
                setLoading(false); 
            } catch (error) {
                setError('Erro ao buscar os dados!');
                setLoading(false); 
            }
        };

        fetchData(); 
    }, []);


    const [searchTerm, setSearchTerm] = useState("");
    const filteredData = lista.filter((album) =>
        album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        album.tracks.some((track) => track.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <Header />
            <section className='container__all'>

                <div className="modal__estatico">
                    <main>
                        <div className="search">
                            <input
                                type="text"
                                placeholder="Digite o nome do álbum ou da musica!"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className='searchSome'
                            />
                            <button className='searchBtn'>Pesquisar</button>

                        </div>
                        

                        {loading ? (
                            <div className="loading">
                                <div className="typing-indicator">
                                    <div className="typing-circle"></div>
                                    <div className="typing-circle"></div>
                                    <div className="typing-circle"></div>
                                    <div className="typing-shadow"></div>
                                    <div className="typing-shadow"></div>
                                    <div className="typing-shadow"></div>
                                </div>
                            </div>
                        ) : error ? (
                            <p className='error'>{error}</p>
                        ) : (
                            <div className="list__">

                                {filteredData.map((album) => (
                                    <div key={album.id} className='albuns'>
                                        <h3>Álbum: {album.name}, {album.year}</h3>
                                        <ul className='traks'>
                                            <li>
                                                <div className="init">
                                                    <span className='spanNumber'><strong>Nº</strong></span>
                                                    <span><strong>Faixa</strong></span>
                                                </div>
                                                <span className='spanDuration'><strong>Duração</strong></span>
                                            </li>

                                            {album.tracks.map((track) => (
                                                <li key={track.id}>
                                                    <div className="init">
                                                        <span className="spanNumber">{track.number}</span>
                                                        <span>{track.title}</span>
                                                    </div>
                                                    <span className="spanDuration">
                                                        {Math.floor(track.duration / 60)}:{Math.floor(track.duration % 60).toString().padStart(2, '0')}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}

                    </main>
                </div>

            </section>
        </>
    )
}

export default Home;
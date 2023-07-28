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
                addList(response); // Supondo que a API retorna uma lista de dados
                setLoading(false); // Defina o estado de loading como false quando os dados forem obtidos
            } catch (error) {
                setError('Erro ao buscar os dados!');
                setLoading(false); // Mesmo em caso de erro, defina o estado de loading como false
            }
        };

        fetchData(); // Chama a função de busca ao montar o componente
    }, []);

    return (
        <>
            <Header />
            <section className='container__all'>

                <div className="modal__estatico">
                    <main>

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

                                {lista.map(item => (
                                    <div className="albuns" key={item.id}>
                                        <h3>Álbum: {item.name}, {item.year}</h3>
                                        <ul className="traks">
                                            <li>
                                                <div className="init">
                                                    <span className='spanNumber'><strong>Nº</strong></span>
                                                    <span><strong>Faixa</strong></span>
                                                </div>
                                                <span className='spanDuration'><strong>Duração</strong></span>
                                            </li>
                                            {item.tracks.map((music, key) => (
                                                <li key={key}>
                                                    <div className="init">
                                                        <span className='spanNumber'>{music.number}</span>
                                                        <span>{music.title}</span>
                                                    </div>
                                                    <span className='spanDuration'>{Math.floor(music.duration / 60)}:{Math.floor(music.duration % 60).toString().padStart(2, '0')}</span>
                                                </li>
                                            ))
                                            }
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
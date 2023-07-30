import { useState, useEffect } from "react";
import "../../static/css/forms.css";
import api from "../../api";

function FormDeleteTrack() {
    const [selectedAlbum, setSelectedAlbum] = useState('DEFAULT');
    const [selectedTrack, setSelectedTrack] = useState('DEFAULT');
    const [lista, addList] = useState([]);
    const [error, setError] = useState(null);
    const [sucess, setSucess] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(false);

    const handleOptionChangeAlbum = (event) => {
        setSelectedAlbum(event.target.value);
        setSelectedTrack('DEFAULT'); // Reseta a seleção da faixa ao trocar de álbum
        setSelected(true); // Habilita o segundo select
        setLoading(false);
    };

    const handleOptionChangeTrack = (event) => {
        setSelectedTrack(event.target.value);
    }

    const resetForm = () => {
        setSelectedAlbum('DEFAULT');
        setSelectedTrack('DEFAULT');
    }


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

        fetchData(); // Chama a função de busca ao montar o componente
    }, []);


    const deleteTrack = async (e) => {
        e.preventDefault();

        if (selectedAlbum !== 'DEFAULT' && selectedTrack !== 'DEFAULT') {
            try {
                api.delete(`/track/${selectedTrack}`);
                setSucess("Faixa deletada do álbum!");
                setTimeout(() => {
                    setSucess(null);
                }, 3000);
            } catch(error) {
                console.error(error);
                setError("Erro ao deletar faixa do álbum!");
                setTimeout(() => {
                    setError(null);
                }, 3000);
            }
        }

        resetForm();
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }

    return (
        <>
            {error ? (
                <div>
                    <p className="error">{error}</p>
                    <br />
                </div>
            ) : sucess ? (
                <div>
                    <p className="sucess">{sucess}</p>
                    <br />
                </div>
            ) : (
                null
            )}

            <h1>Excluir Faixa</h1>
            <form className="add__Album" onSubmit={deleteTrack}>
                <div className="line__">
                    <label htmlFor="album">Álbum:</label>
                    <select
                        value={selectedAlbum}
                        required={true}
                        onChange={handleOptionChangeAlbum}
                        className="exclude__album"
                        title="Escolha o álbum que deseja excluir uma faixa!">

                        <option disabled={true} value="DEFAULT">Selecionar</option>
                        {
                            loading ? (
                                <option disabled={true}>Carregando...</option>
                            ) : error ? (
                                <option disabled={true}>{error}</option>
                            ) : (
                                lista.map((item, index) => (
                                    <option value={item.id} key={index}>{item.name}</option>
                                ))
                            )
                        }
                    </select>
                </div>

                <div className="line__">
                    <label htmlFor="album">Faixa:</label>
                    <select
                        value={selectedTrack}
                        required={true}
                        onChange={handleOptionChangeTrack}
                        disabled={!selected}
                        className="exclude__album"
                        title="Escolha a faixa que deseja excluir!"
                    >
                        <option disabled={true} value="DEFAULT">
                            Selecionar
                        </option>
                        {loading ? (
                            <option disabled={true}>Carregando...</option>
                        ) : error ? (
                            <option disabled={true}>{error}</option>
                        ) : selected ? (
                            lista.map((album) =>
                                album.id === parseInt(selectedAlbum) // Verifica se o álbum atual é o selecionado
                                    ? album.tracks.map((track) => (
                                        <option key={track.id} value={track.id}>
                                            {track.title}
                                        </option>
                                    ))
                                    : null
                            )
                        ) : (
                            null
                        )}
                    </select>
                </div>

                <div className="btn__gp">
                    <button type="submit" className="delete">Exluir</button>
                </div>
            </form>
        </>
    )
}

export default FormDeleteTrack;
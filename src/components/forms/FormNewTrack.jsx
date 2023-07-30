import { useState, useEffect } from "react";
import "../../static/css/forms.css";
import api from "../../api";

function FormNewTrack() {
    const [selectedOption, setSelectedOption] = useState('DEFAULT');
    const [lista, addList] = useState([]);
    const [error, setError] = useState(null);
    const [sucess, setSucess] = useState(null);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [number, setNumber] = useState('');
    const [duration, setDuration] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const resetForm = () => {
        setNumber('');
        setSelectedOption('DEFAULT');
        setTitle('');
        setDuration('')
    }


    useEffect(() => {
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

    const addTrack = async (e) => {
        e.preventDefault();

        if (selectedOption != 'DEFAULT') {
            try {
                await api.post('/track', {
                    album_id: selectedOption,
                    number: number,
                    title: title,
                    duration: duration
                });

                setSucess("Faixa adicionada ao álbum!");
                setTimeout(() => {
                    setSucess(null);
                }, 3000);

            } catch (error) {
                setError("Erro ao adicionar faixa ao álbum!");
                setTimeout(() => {
                    setError(null);
                }, 3000);
            }
        }

        resetForm();
        setTimeout(() => {
            window.location.reload();
        }, 3500);
    }

    return (
        <>
            {error ? (
                <div>
                    <p className="error">{error}</p>
                    <br />
                </div>
            ): sucess ? (
                <div>
                    <p className="sucess">{sucess}</p>
                    <br />
                </div>
            ) : (
                null
            )}

            <h1>Adicionar Faixa</h1>
            <form className="add__Album" onSubmit={addTrack}>
                <div className="line__">
                    <label htmlFor="album">Álbum:</label>
                    <select 
                    value={selectedOption} 
                    required={true} 
                    onChange={handleOptionChange} 
                    className="exclude__album" 
                    title="Escolha o álbum que deseja adicionar uma nova faixa!">

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
                    <label htmlFor="number">Número da faixa:</label>
                    <input type="number"  value={number} required={true}
                        onChange={e => setNumber(e.target.value)} title="Insira o número da faixa!"/>
                </div>

                <div className="line__">
                    <label htmlFor="title">Título:</label>
                    <input type="text" value={title} required={true}
                        onChange={e => setTitle(e.target.value)} title="Insira o título da faixa!" />
                </div>

                <div className="line__">
                    <label htmlFor="duration">Duração:</label>
                    <input type="number" value={duration} required={true}
                        onChange={e => setDuration(e.target.value)} title="Insira a duração da faixa em segundos!" />
                </div>
                
                <div className="btn__gp">
                    <button type="submit">Adicionar</button>
                </div>
            </form>
        </>
    )
}

export default FormNewTrack;
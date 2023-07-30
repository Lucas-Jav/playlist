import { useState, useEffect } from "react";
import "../../static/css/forms.css";
import api from "../../api";


function FormDeleteAlbum() {
    const [selectedOption, setSelectedOption] = useState('DEFAULT');
    const [lista, addList] = useState([]);
    const [error, setError] = useState(null);
    const [sucess, setSucess] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };


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

    const deleteAlbum = async (e) => {
        e.preventDefault();

        if (selectedOption != 'DEFAULT') {
            try {
                await api.delete(`/album/${selectedOption}`);
                setSucess("Álbum excluido com sucesso!");
                setSelectedOption('DEFAULT');
                setTimeout(() => {
                    setSucess(null);
                }, 5000);
            } catch(error) {
                console.error(error);
                setError("Erro ao excluir álbum!");
                setSelectedOption('DEFAULT');
                setTimeout(() => {
                    setError(null);
                }, 5000);
            }
        }
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

            <h1>Excluir Álbum</h1>
            <form className="add__Album" onSubmit={deleteAlbum}>
                <div className="line__">
                    <label htmlFor="album">Álbum:</label>
                    <select 
                    value={selectedOption} 
                    required={true} 
                    onChange={handleOptionChange} 
                    className="exclude__album" 
                    title="Escolha o álbum que deseja excluir!">

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
                
                <div className="btn__gp">
                    <button type="submit" className="delete">Excluir</button>
                </div>
            </form>
        </>
    )
}

export default FormDeleteAlbum;
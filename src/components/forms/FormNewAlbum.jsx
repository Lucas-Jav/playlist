import { useState } from "react";
import "../../static/css/forms.css";
import api from "../../api";

function FormAlbumAdd() {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState(null);
    const [sucess, setSucess] = useState(null);

    const addAlbum = async (e) => {
        e.preventDefault();

        console.log({name,year})

        try {
            const response = await api.post('/album', {name, year});
            console.log(response.data);
            setSucess("Álbum adicionado!")
        } catch (error) {
            console.error('Erro na requisição:', error);
            setError("Erro na requisição!");
        }

        setName('');
        setYear('');
    }

    return (
        <>
            {error ? (
                <p className="error">{error}</p>
            ): sucess ? (
                <p className="sucess">{sucess}</p>
            ) : (
                null
            )}
            <h1>Adicionar Álbum</h1>
            <form className="add__Album" onSubmit={addAlbum}>
                <div className="line__">
                    <label htmlFor="name">Nome:</label>
                    <input type="text" value={name} required={true}
                        onChange={e => setName(e.target.value)} title="Insira o nome do álbum!" />
                </div>
                <div className="line__">
                    <label htmlFor="year">Ano:</label>
                    <input type="number" value={year} required={true}
                        onChange={e => setYear(e.target.value)} title="Insira o ano do álbum!" />
                </div>
                <div className="btn__gp">
                    <button type="submit">Adicionar</button>
                </div>
            </form>
        </>
    )
}

export default FormAlbumAdd;
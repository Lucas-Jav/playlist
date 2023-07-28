import Header from "../components/header/Header";
import FormAlbumAdd from "../components/forms/FormNewAlbum";


function Albuns() {
    

    return (
        <>
            <Header />
            <section className='container__all'>
                <div className="modal__estatico">
                    <main>
                        <FormAlbumAdd />
                    </main>
                </div>
            </section>
        </>
    )
}

export default Albuns;
import Header from "../components/header/Header";
import FormAlbumAdd from "../components/forms/FormNewAlbum";
import FormDeleteAlbum from "../components/forms/FormDeleteAlbum";
import FormNewTrack from "../components/forms/FormNewTrack";

function Albuns() {
    

    return (
        <>
            <Header />
            <section className='container__all'>
                <div className="modal__estatico">
                    <main>
                        <FormAlbumAdd />
                        <FormDeleteAlbum />
                        <FormNewTrack />
                    </main>
                </div>
            </section>
        </>
    )
}

export default Albuns;
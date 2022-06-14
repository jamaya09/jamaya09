import react from "react";
import '../Styles/Pages/Consulta.css'

const Consulta = (props)=>{


    return(
        <div>
            <br/>
            <form method="get" className="form-contenedor">
                <input type="text" className="raise" name="busquedaContenedor" placeholder="Ingresar contenedor"/>
                <button className="raise">Enviar</button>
            </form>
        </div>

    );
}
export default Consulta
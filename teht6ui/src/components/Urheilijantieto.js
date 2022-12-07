import React from "react";
import { Link } from "react-router-dom";

import { useState, useContext } from "react";
import urheilijatContext from "../context/urheilijatContext";
import { useNavigate } from "react-router-dom";
const UrheilijanTieto = (props) => {
  const UrheilijatContext = useContext(urheilijatContext); //hooks
  let history = useNavigate();
  const [naytaUrheilijantieto, setnaytaUrheilijantieto] = useState(false);

  const onDeleteClick = (id) => {
    UrheilijatContext.deleteUrheilija(id);
    window.location.reload();
    history("/");
  };
  const onShowClick = (e) => {
    let lippu = !naytaUrheilijantieto;
    setnaytaUrheilijantieto(lippu);
  };
  const {
    id,
    etunimi,
    sukunimi,
    kutsumanimi,
    syntymavuosi,
    paino,
    laji,
    saavutukset,
  } = props.urheilija;
  return (
    <div className="card card-body mb-3 display:flex, justifyContent: flex-end">
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <h4>{sukunimi}</h4>
        <button className="button_left" onClick={onShowClick.bind(this)}>
          Näytä lisää tietoja
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div
          className="btn-group mr-2 text-right"
          role="group"
          aria-label="Second group"
        >
          <button
            className="button_right"
            onClick={onDeleteClick.bind(this, { id })}
          >
            Poista
          </button>
          <Link to={`/muokkaa/${id}`}>
            <button className="button_right">Muokkaa</button>
          </Link>
        </div>
      </div>
      {naytaUrheilijantieto ? (
        <ul className="list-group">
          <li className="list-group-item">Etunimi: {etunimi}</li>
          <li className="list-group-item">Sukunimi: {sukunimi}</li>
          <li className="list-group-item">Kutsumanimi: {kutsumanimi}</li>
          <li className="list-group-item">Syntymavuosi: {syntymavuosi}</li>
          <li className="list-group-item">Paino: {paino}</li>
          <li className="list-group-item">Laji: {laji}</li>
          <li className="list-group-item">Saavutukset: {saavutukset}</li>
        </ul>
      ) : null}
    </div>
  );
};
/*Puhelintieto.propTypes = {
yhteystieto: PropTypes.object.isRequired,
//deleteClickHandler: PropTypes.func.isRequired,//ei tarvita enää
};*/
export default UrheilijanTieto;

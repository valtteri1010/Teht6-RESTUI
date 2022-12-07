import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import urheilijatContext from "../context/urheilijatContext";

export default function LisaaUrheilijantieto() {
  let history = useNavigate();
  const [etunimi, setEtunimi] = useState("");
  const [sukunimi, setSukunimi] = useState("");
  const [kutsumanimi, setKutsumanimi] = useState("");
  const [syntymavuosi, setSyntymavuosi] = useState("");
  const [paino, setPaino] = useState("");
  const [laji, setLaji] = useState("");
  const [saavutukset, setSaavutukset] = useState("");

  const UrheilijatContext = useContext(urheilijatContext);

  const handleSubmit = async (e) => {
    const lisattyUrheilija = {
      etunimi: etunimi,
      sukunimi: sukunimi,
      kutsumanimi: kutsumanimi,
      syntymavuosi: syntymavuosi,
      paino: paino,
      laji: laji,
      saavutukset: saavutukset,
    };
    console.log("Tarkistetaan lisättyjä tietoja");
    console.log(lisattyUrheilija);

    UrheilijatContext.addUrheilija(lisattyUrheilija);
    history("/");
  };
  return (
    <div className="card mb-3">
      <div className="card-header">Lisää urheilija</div>
      <div className="card-body">
        <form onSubmit={handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="etunimi">Etunimi</label>
            <input
              id="etunimitieto"
              name="etunimi"
              className="form-control form-control-lg"
              placeholder="Syötä etunimi..."
              value={etunimi}
              onChange={(event) => setEtunimi(event.target.value)}
            />
            <div className="invalid-feedback">Täytä etunimi</div>
          </div>
          <div className="form-group">
            <label htmlFor="sukunimi">Sukunimi</label>
            <input
              id="sukunimitieto"
              name="sukunimi"
              className="form-control form-control-lg"
              placeholder="Syötä sukunimi..."
              value={sukunimi}
              onChange={(event) => setSukunimi(event.target.value)}
            />
            <div className="invalid-feedback">Täytä sukunimi</div>
          </div>

          <div className="form-group">
            <label htmlFor="kutsumanimi">Kutsumanimi</label>
            <input
              id="kutsumanimitieto"
              name="kutsumanimi"
              className="form-control form-control-lg"
              placeholder="Syötä kutsumanimi..."
              value={kutsumanimi}
              onChange={(event) => setKutsumanimi(event.target.value)}
            />
            <div className="invalid-feedback">Täytä kutsumanimi</div>
          </div>

          <div className="form-group">
            <label htmlFor="syntymavuosi">Syntymavuosi</label>
            <input
              id="syntymavuosi"
              name="sukunimi"
              className="form-control form-control-lg"
              placeholder="Syötä syntymavuosi..."
              value={syntymavuosi}
              onChange={(event) => setSyntymavuosi(event.target.value)}
            />
            <div className="invalid-feedback">Täytä syntymävuosi</div>
          </div>

          <div className="form-group">
            <label htmlFor="paino">Paino</label>
            <input
              id="painotieto"
              name="paino"
              className="form-control form-control-lg"
              placeholder="Syötä paino..."
              value={paino}
              onChange={(event) => setPaino(event.target.value)}
            />
            <div className="invalid-feedback">Täytä paino</div>
          </div>

          <div className="form-group">
            <label htmlFor="laji">Laji</label>
            <input
              id="lajitieto"
              name="laji"
              className="form-control form-control-lg"
              placeholder="Syötä laji..."
              value={laji}
              onChange={(event) => setLaji(event.target.value)}
              //error={virheet.puhelin}
            />
            <div className="invalid-feedback">Täytä laji</div>
          </div>

          <div className="form-group">
            <label htmlFor="saavutukset">Saavutukset</label>
            <input
              id="saavutuksettieto"
              name="saavutukset"
              className="form-control form-control-lg"
              placeholder="Syötä saavutukset..."
              value={saavutukset}
              onChange={(event) => setSaavutukset(event.target.value)}
            />
            <div className="invalid-feedback">Täytä saavutukset</div>
          </div>
          <input
            type="submit"
            value="Lisää urheilijantiedot"
            className="btn btn-light btn-block"
          />
        </form>
      </div>
    </div>
  );
}

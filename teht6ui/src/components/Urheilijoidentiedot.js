import React, { useContext, useEffect } from "react";
import Urheilijantieto from "./Urheilijantieto";

import urheilijatContext from "../context/urheilijatContext";

const Urheilijoidentiedot = () => {
  const UrheilijatContext = useContext(urheilijatContext); //hooks
  console.log(UrheilijatContext);
  useEffect(() => {
    UrheilijatContext.getUrheilijat();
    console.log(UrheilijatContext);
  }, []);
  return (
    <>
      <h1 className="display-4 mb-2">
        <span className="text-danger">Urheilijoidentiedot</span>
      </h1>
      <React.Fragment>
        {UrheilijatContext.urheilijat.length
          ? UrheilijatContext.urheilijat.map((urheilija) => (
              <Urheilijantieto key={urheilija.id} urheilija={urheilija} />
            ))
          : null}
      </React.Fragment>
    </>
  );
};
export default Urheilijoidentiedot;

import React, { useReducer } from "react";
import AppReducer from "./AppReducer";
import urheilijatContext from "./urheilijatContext";
import { GET_URHEILIJAT } from "./types";
import axios from "axios";
const GlobalState = (props) => {
  //initial state
  let initialState = {
    urheilijat: [],
  };
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const getUrheilijat = async () => {
    try {
      let res = await axios.get("http://localhost:3001/urheilijat");
      let { data } = res;
      dispatch({ type: GET_URHEILIJAT, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
  const getUrheilija = async (id) => {
    try {
      let sql = "http://localhost:3001/urheilijat/" + id;
      //alert(sql);
      let res = await axios.get(sql);
      let { data } = res;
      console.log("GET_URHEILIJA:");
      //dispatch({ type: "GET_YHTEYSTIETO", payload: res.data });
      dispatch({ type: "GET_URHEILIJA", payload: data });
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const addUrheilija = async (uusiUrheilija) => {
    try {
      const res = await axios
        .post(`http://localhost:3001/lisaa`, uusiUrheilija)
        .then((res) => {
          dispatch({ type: "ADD_URHEILIJA", payload: res.data });
          console.log(res.data);
        });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  const updateUrheilija = async (id, paivitettyUrheilija) => {
    try {
      const res = await axios
        .put(`http://localhost:3001/urheilijat/${id}`, paivitettyUrheilija)
        .then((res) => {
          dispatch({ type: "EDIT_URHEILIJA", payload: res.data });
          console.log(res.data);
        });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteUrheilija = async (id) => {
    try {
      let sql = "http://localhost:3001/urheilijat/" + id["id"];

      const res = await axios.delete(sql).then((res) => {
        dispatch({ type: "DELETE_URHEILIJA", payload: id["id"] });
        console.log(res.data);
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <urheilijatContext.Provider
      value={{
        urheilijat: state.urheilijat,
        getUrheilija,
        getUrheilijat,
        addUrheilija,
        updateUrheilija,
        deleteUrheilija,
      }}
    >
      {props.children}
    </urheilijatContext.Provider>
  );
};
//};
export default GlobalState;

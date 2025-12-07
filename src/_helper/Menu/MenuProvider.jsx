// _helper/Menu/MenuContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { MenuApi } from "../../api";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [mainmenu, setMainMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedMenu = localStorage.getItem("Menu");

    if (storedMenu) {
      try {
        const parsedMenu = JSON.parse(storedMenu);
        if (Array.isArray(parsedMenu)) {
          setMainMenu(parsedMenu);
          setLoading(false);
          return;  
        }
      } catch (err) {
        localStorage.removeItem("Menu"); // clean invalid data
      }
    }

    // ✅ Fallback: fetch from API if not found or invalid
    const fetchMenu = async () => {
      setLoading(true);
     const userID = localStorage.getItem("userId") || 0;
      try {
        const resp = await axios.post(MenuApi, { userID });
        if (resp.data && Array.isArray(resp.data.Menu)) {
          setMainMenu(resp.data.Menu);
          localStorage.setItem("Menu", JSON.stringify(resp.data.Menu));
        } else {
          setMainMenu([]);
        }
      } catch (err) {
        setError(err);
        console.error("Menu fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []); 
  return (
    <MenuContext.Provider value={{ mainmenu, setMainMenu, loading, error }}>
      {children}
    </MenuContext.Provider>
  );
};

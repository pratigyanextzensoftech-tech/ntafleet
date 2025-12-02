import React, { useEffect } from 'react';
import Routers from './Route';
import AnimationThemeProvider from './_helper/AnimationTheme/AnimationThemeProvider';
import CustomizerProvider from './_helper/Customizer/CustomizerProvider';
import { MenuProvider } from './_helper/Menu/MenuProvider';

const App = () => {

  // useEffect(() => {
  //   // Generate unique ID for each tab
  //   if (!localStorage.getItem("tabId")) {
  //     localStorage.setItem("tabId", crypto.randomUUID());
  //   }

  //   // Clear login when tab/browser closes
  //   const handleClose = () => {
  //     localStorage.clear();
  //   };

  //   window.addEventListener("beforeunload", handleClose);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleClose);
  //   };
  // }, []);

  return (
    <div className='App'>
      <CustomizerProvider>
        <AnimationThemeProvider>
          <MenuProvider>
            <Routers />
          </MenuProvider>
        </AnimationThemeProvider>
      </CustomizerProvider>
    </div>
  );
}

export default App;

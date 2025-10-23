import React from 'react';
import Routers from './Route';
import AnimationThemeProvider from './_helper/AnimationTheme/AnimationThemeProvider';
import CustomizerProvider from './_helper/Customizer/CustomizerProvider';
import { MenuProvider } from './_helper/Menu/MenuProvider';
const App = () => (
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

export default App;

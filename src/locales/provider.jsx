import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';

import Locales from './locales';
// provider is declared but its value is never read.
 const Provider = ({children, locale})=>(

      <IntlProvider
      locale={locale}
      textComponent = {Fragment}
      // error messages not defined? 
      messages={messages[Locales]}/>
 )
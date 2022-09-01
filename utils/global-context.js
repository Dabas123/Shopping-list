import React from 'react';

const GlobalContext = React.createContext({
  count: 0,
  username: '',
  update: (data) => {}
})

export default GlobalContext
import React from 'react';

interface AppProps {
  name: string;
}

const App = (props: AppProps) => (
  <h1>Hello, {`${props.name}!`}</h1>
)

export default App;

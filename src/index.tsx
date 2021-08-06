import React from 'react';
import ReactDOM from 'react-dom';

interface AppProps {
  name: string;
}

const App = (props: AppProps) => <h1>Hello, {`${props.name}!`}</h1>

ReactDOM.render(<App name={'Laura'} />, document.getElementById('root'));

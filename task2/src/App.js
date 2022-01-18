import { useEffect} from 'react';

import Page from './components/Page';

function App() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://kit.fontawesome.com/bf776ecce2.js";
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);

   return (
        <div className="App">
            <Page/>
        </div>
    );
}

export default App;

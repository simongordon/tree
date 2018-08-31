import * as React from "react";

interface AppProps {}
interface AppState {}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
    }

    render() {
        return <div>This is the app</div>;
    }
}

export default App;
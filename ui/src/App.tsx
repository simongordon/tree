import * as React from "react";
import { Formik, Form, Field } from "formik";

interface Note {
    content: string;
}

interface AppProps {}
interface AppState {
    notes: Note[]
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            notes: []
        }
    }

    addNote(newNote: Note) {
        this.setState(({notes}) => {
            notes.push(newNote);
            return ({notes});
        })
    }

    render() {
        const {notes} = this.state;
        return <div>
            <ul>
            {
                notes.map(n => <li>{n.content}</li>)
            }
            </ul>
            <Formik
                initialValues={{
                    content: ''
                }}
                onSubmit={(values, {resetForm}) => {
                    this.addNote(values);
                    resetForm();
                }}
                render={({values}) => <Form>
                        <Field 
                        id="content"
                        name="content"
                        />
                        <button type="submit">Add</button>
                    </Form>}
            />
        </div>;
    }
}

export default App;
import * as React from "react";
import { Formik, Form, Field, FormikErrors } from "formik";
import Graph from "vis-react";
import { Options, Data } from 'vis';

interface Note {
    id: number;
    content: string;
    parent: number | null;
}

interface AppProps { }
interface AppState {
    notes: Note[]
}



var events = {
    select: function (event) {
        var { nodes, edges } = event;
    }
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            notes: []
        }
    }

    addNote({ content, parent }: { content: string, parent: string | number }) {
        this.setState(({ notes }) => {
            const newNote: Note = {
                id: notes.length + 1,
                content,
                parent: (parent || parent === 0) ? parseInt(`${parent}`) : null
            }
            notes.push(newNote);
            return ({ notes });
        })
    }

    render() {
        const { notes } = this.state;

        const graph: Data = {
            nodes: notes.map(n => ({
                id: n.id,
                label: n.content,
            })),
            edges: notes.filter(n => n.parent !== null).map(n => ({
                from: n.parent as number,
                to: n.id,
            }))
        };

        var options: Options = {
            //   width: "100px",
            //   height: "100px",
            layout: {
                hierarchical: true
            },
            edges: {
                color: "#000000"
            }
        };


        return <div>
            <ul>
                {
                    notes.map(n => <li><strong>{n.id}</strong> {n.content}</li>)
                }
            </ul>

            <Formik
                initialValues={{
                    content: '',
                    parent: ''
                }}
                validate={(values) => {
                    const errors: FormikErrors<typeof values> = {};
                    // if ((values.parent == "")) {
                    //     errors.parent = "Requried";
                    // }
                    return errors;
                }}
                onSubmit={(values, { resetForm }) => {
                    this.addNote(values);
                    resetForm();
                }}
                render={({ values }) => <Form>
                    <Field
                        id="content"
                        name="content"
                    />
                    <Field
                        id="parent"
                        name="parent"
                    />
                    <button type="submit">Add</button>
                </Form>}
            />
            <div>
                <Graph graph={graph} options={options} events={events} />
            </div>
        </div>;
    }
}

export default App;
import * as React from "react";
import { Formik, Form, Field, FormikErrors } from "formik";
import Graph from "vis-react";
import { Options, Data } from 'vis';

interface Note {
    id: number;
    content: string;
}

interface Relationship {
    from: number;
    to: number;
}

interface AppProps { }
interface AppState {
    notes: Note[],
    relationships: Relationship[],
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
            notes: [],
            relationships: [],
        }
    }

    addNote({ content }: { content: string }) {
        this.setState(({ notes }) => {
            const newNote: Note = {
                id: notes.length + 1,
                content,
            }
            notes.push(newNote);
            return ({ notes });
        })
    }

    addRelationship(newRelationship: { from: number, to: number }) {
        this.setState(({ relationships }) => {
            relationships.push(newRelationship);
            return ({ relationships });
        })
    }


    render() {
        const { notes, relationships } = this.state;

        const graph: Data = {
            nodes: notes.map(n => ({
                id: n.id,
                label: n.content,
            })),
            edges: relationships.map(o => o) // dunno why
        };

        var options: Options = {
            //   width: "100px",
            //   height: "100px",
            layout: {
                hierarchical: true
            },
            edges: {
                color: "#000000"
            },
            manipulation: {
                addEdge: (data, callback) => {
                    console.log(data);
                }
            }
        };


        return <div>


            <Formik<{ content: string }>
                initialValues={{
                    content: '',
                }}
                validate={(values) => {
                    const errors: FormikErrors<typeof values> = {};
                    if ((values.content == "")) {
                        errors.content = "Requried";
                    }
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
                        placeholder="content"
                    />
                    <button type="submit">Add node</button>
                </Form>
                }
            />

            <Formik<{ from: string, to: string }>
                initialValues={{
                    from: '',
                    to: ''
                }}
                validate={(values) => {
                    const errors: FormikErrors<typeof values> = {};
                    if (isNaN(parseInt(values.from))) {
                        errors.from = "NaN";
                    }
                    if (isNaN(parseInt(values.to))) {
                        errors.to = "NaN";
                    }
                    return errors;
                }}
                onSubmit={(values, { resetForm }) => {
                    const fixedValues = {
                        from: parseInt(values.from),
                        to: parseInt(values.to),
                    }
                    this.addRelationship(fixedValues);
                    resetForm();
                }}
                render={({ values }) => <Form>
                    <Field
                        id="from"
                        name="from"
                        placeholder="from"
                    />
                    <Field
                        id="to"
                        name="to"
                        placeholder="to"
                    />
                    <button type="submit">Add relationship</button>
                </Form>
                }
            />

            <ul>
                {
                    notes.map(n => <li key={n.id}><strong>{n.id}</strong> {n.content}</li>)
                }
            </ul>

            <div>
                <Graph graph={graph} options={options} events={events} />
            </div>
        </div>;
    }
}

export default App;
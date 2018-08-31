import * as React from "react";
import { Formik, Form, Field } from "formik";
import Graph from "vis-react";

interface Note {
    content: string;
}

interface AppProps {}
interface AppState {
    notes: Note[]
}

var graph = {
    nodes: [
        {id: 1, label: 'Node 1'},
        {id: 2, label: 'Node 2'},
        {id: 3, label: 'Node 3'},
        {id: 4, label: 'Node 4'},
        {id: 5, label: 'Node 5'}
      ],
    edges: [
        {from: 1, to: 2},
        {from: 1, to: 3},
        {from: 2, to: 4},
        {from: 2, to: 5}
      ]
  };
   
  var options = {
    //   width: "100px",
    //   height: "100px",
      layout: {
          hierarchical: true
      },
      edges: {
          color: "#000000"
      }
  };
   
  var events = {
      select: function(event) {
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
                        <div>

<Graph graph={graph} options={options} events={events} />
</div>
        </div>;
    }
}

export default App;
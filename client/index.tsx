import * as io from "socket.io-client";
import * as React from "react";
import * as ReactDOM from "react-dom";

require("./index.scss");

interface Click {
  name: string;
  timeStamp: Date;
}
interface ApplicationProps {}
interface ApplicationState {
  isConnected: boolean;
  name: string;
  clicks: Click[];
}

/**
 * Application component.
 */
class Application extends React.Component<ApplicationProps, ApplicationState> {
  private socket: any;
  private theButton: HTMLButtonElement;

  constructor(props: any) {
    super(props);
    this.onNameInputChange = this.onNameInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      isConnected: false,
      name: "",
      clicks: []
    }
  }

  /**
   * Initializes socket and socket events.
   */
  componentDidMount() {
    this.socket = io("http://localhost:3000/");
    this.socket.on("connected", (data: Click[]) => {
      this.setState({ 
        isConnected: true,
        clicks: data
      });
    });
    this.socket.on("clicked", (data: Click[]) => {
      this.setState({ 
        clicks: data 
      }, () => {
        this.theButton.classList.add("pressed");
        setTimeout(() => {
          this.theButton.classList.remove("pressed");
        }, 200)
      });
    });
    this.socket.on("connect_error", () => {
      this.setState({
        isConnected: false
      })
      // TODO: Disable elements.
    })
  }

  /**
   * Renders the "clicked by" element.
   */
  renderClickedBy() {
    let name = "Nobody";
    if (this.state.clicks.length > 0) {
      name = this.state.clicks[this.state.clicks.length -1].name
    }
    
    return <p>{`${name} pressed the button`}</p>
  }

  /**
   * Renders the "number of clicks" element.
   */
  renderClicks() {
    return <p>{ `${this.state.clicks.length} clicks!` }</p>
  }

  onNameInputChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ name: e.currentTarget.value });
  }

  onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const click = {
      name: this.state.name,
      timeStamp: new Date(Date.now())
    }
    this.socket.emit("click", click);
    this.setState(previousState => {
      return {
        clicks: [...previousState.clicks, click]
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.onFormSubmit}>
          <div className="row">
            <input type="text" 
              id = "name-input"
              placeholder="Enter a name..."
              value={ this.state.name }
              onChange={ this.onNameInputChange } />
          </div>
          <div className="row">
            <button id="the-button" 
              ref={ r => this.theButton = r}
            >Press me!</button>
          </div>
        </form>
        <div className="row">
          { this.renderClickedBy() }
          { this.renderClicks() }
        </div>
        <div id="connection-refused" className={ this.state.isConnected ? "hidden" : "" }>
          <p>Connection failed!</p>
        </div>
      </React.Fragment>
    )
  }
}

ReactDOM.render(
  <Application />,
  document.getElementById("root")
);
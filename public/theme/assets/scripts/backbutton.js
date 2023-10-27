
const beforeUnloadListener = (event) => {
    event.preventDefault();
    return (event.returnValue = "");
    };
  
  const inputs = document.querySelectorAll('.text');
  
  inputs.forEach(input => {
    input.addEventListener("input", (event) => {
      if (event.target.value !== "") {
        addEventListener("beforeunload", beforeUnloadListener, { capture: true });
      } else {
        removeEventListener("beforeunload", beforeUnloadListener, {
          capture: true,
        });
      }
    });
  })

import { Beforeunload } from 'react-beforeunload';

class Example extends React.Component {
  state = { value: '' };

  render() {
    return (
      <>
        {this.state.value !== '' && (
          <Beforeunload onBeforeunload={(event) => event.preventDefault()} />
        )}
        <input
          onChange={(event) => this.setState({ value: event.target.value })}
          value={this.state.value}
        />
      </>
    );
  }
}


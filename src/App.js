import React, { Component } from "react";
import PokeCard from "./components/PokeCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./Container";
import Row from "./Row";
import Column from "./Column";
import pokemon from "./pokemon.json";
import "./App.css";

function switchPokemon(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  // Set this.state
  state = {
    pokemon,
    currentScore: 0,
    topScore: 0,
    rightWrong: "",
    clicked: [],
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      rightWrong: ""
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ rightWrong: "You win!" });
    }
    this.handleswitch();
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      rightWrong: "The Pokemon Broke Free!",
      clicked: []
    });
    this.handleswitch();
  };

  handleswitch = () => {
    let switchedPokemon = switchPokemon(pokemon);
    this.setState({ pokemon: switchedPokemon });
  };

  render() {
    return (
      <Wrapper>
        <Nav
          title="REMEMBER THAT POKEMON!"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          rightWrong={this.state.rightWrong}
        />

        <Title>
          Click a Pokemon to catch it, but the trick is not to catch the same one twice! You gotta catch 'em all to win!
        </Title>

        <Container>
          <Row>
            {this.state.pokemon.map(pokemon => (
              <Column size="md-3 sm-6">
                <PokeCard
                  key={pokemon.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleswitch={this.handleswitch}
                  id={pokemon.id}
                  image={pokemon.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default App;
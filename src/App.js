import React, {Component} from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import { generatePalette } from './colorHelpers';
import {Route, Switch} from 'react-router-dom';

class App extends Component {

  findPalette(id) {
    return seedColors.find(function(palette) {
      return palette.id === id;
    });
  }

  render() {
    return (
      <Switch>
        <Route 
          exact 
          path="/" 
          render={(routeProps) => <PaletteList palettes={seedColors} {...routeProps}/>} 
        />
        <Route exact path="/palette/:id" render={(routeProps) => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>} />
      </Switch>
    );
  }
}

export default App;
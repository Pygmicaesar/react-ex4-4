import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from '@material-ui/core/Paper';
import MenuItem from 'material-ui/MenuItem';
import Button from '@material-ui/core/Button';
import SelectField from 'material-ui/SelectField';
import Slider from 'material-ui/Slider';

/*
 * Author: Jesse Sydänmäki
 * Github: Pygmicaesar
 */

class App extends Component {

	constructor() {
		super();
		this.state = {
			colourName: 'Red',
			red: 0,
			green: 0,
			blue: 0,
			colour: 'rgb(0,0,0)',
			combos: [],
			toUndo: [],
		}
  }
  
	styles = {
	  sliders: {
		  display: 'flex',
		  height: 200,
		  flexDirection: 'row',
		  justifyContent: 'space-around',
	  },
  };	
	
	setColourName = v => {
		this.setState({
			colourName: v,
		});
	}
	
	setRed = v => {
		this.setState({
			red: v,
		});
	}

	setGreen = v => {
		this.setState({
			green: v,
		});
	}

	setBlue = v => {
		this.setState({
			blue: v,
		});
	}
	
	saveColour = () => {

		const c = this.state.colour;
		const edit = {undo: () => {this.undoColour(c)}};
		this.setState({
			colour: 'rgb(' + this.state.red + ',' + this.state.green + ',' + this.state.blue + ')',
			toUndo: this.state.toUndo.concat(edit),
		});
	}
	
	undo = () => {

		if (this.state.toUndo.length > 0) {

			let edit = this.state.toUndo[this.state.toUndo.length - 1];
			edit.undo();
			this.setState({
				toUndo: this.state.toUndo.slice(0, this.state.toUndo.length - 1),
			})
		}
	}
	
	add = () => {

		const newCombos = this.state.combos.concat({colour: this.state.colour, name: this.state.colourName});
		const edit = {undo: () => {this.undoAdd()}};
		this.setState({
			combos: newCombos,
			toUndo: this.state.toUndo.concat(edit),
		});
	}
	
	undoAdd = () => {

		this.setState({
			combos: this.state.combos.slice(0, this.state.combos.length - 1),
			toUndo: this.state.toUndo.slice(0, this.state.toUndo.length - 1),
		});
	}
	
	undoColour = (colourString) => {
		const cols = colourString.substring(4, colourString.length - 1).split(',');
		this.setState({
			red: parseInt(cols[0]),
			green: parseInt(cols[1]), 
			blue: parseInt(cols[2]),
			colour: colourString,
			toUndo: this.state.toUndo.slice(0, this.state.toUndo.length - 1),
		});
	}
	
	render() {

		let list = [];
		for (var i = 0; i < this.state.combos.length; i++) {
			const comb = this.state.combos[i];
			list.push(<div style = {{backgroundColor: comb.colour}}>{comb.name}</div>);
    }
    
		const c = 'rgb(' + this.state.red + ',' + this.state.green + ',' + this.state.blue + ')';
		
		return (
			<MuiThemeProvider>
				<div className = 'App'>
					<Paper style = {{width: 400, textAlign: 'center'}}>
						<div>
              <Button 
                variant = 'contained' 
                disabled = {this.state.toUndo.length === 0} 
                onClick = {this.undo}
              >
                Undo
              </Button>
						</div>
            <SelectField 
							onChange = {(e, v) => {this.setColourName(v)}}
							floatingLabelText = 'Select colour name'
							value = {this.state.colourName}
						>
							<MenuItem value = 'Red' primaryText = 'Red' />
							<MenuItem value = 'Green' primaryText = 'Green' />
              <MenuItem value = 'Blue' primaryText = 'Blue' />
              <MenuItem value = 'Magenta' primaryText = 'Magenta' />
							<MenuItem value = 'Cyan' primaryText = 'Cyan' />
							<MenuItem value = 'Peach' primaryText = 'Peach' />
						</SelectField>
						
						<div style = {{backgroundColor: c}} >
							<div style = {this.styles.sliders}>
								<Slider
                  style = {{height: 150}} 
                  value = {this.state.red} 
                  onDragStop = {(e) => {this.saveColour()}}
									onChange = {(e, v) => {this.setRed(v)}}
                  step = {1} 
                  min = {0} 
                  max = {255} 
									axis = 'y'
								/>
                <Slider 
                  style = {{height: 150}} 
                  value = {this.state.green} 
                  onDragStop = {(e) => {this.saveColour()}}
									onChange = {(e, v) => {this.setGreen(v)}}
                  step = {1} 
                  min = {0} 
                  max = {255} 
									axis='y'
								/>
                <Slider 
                  style = {{height: 150}} 
                  value = {this.state.blue}
                  onDragStop = {(e) => {this.saveColour()}}
									onChange = {(e, v) => {this.setBlue(v)}} 
                  step = {1} 
                  min = {0} 
                  max = {255} 
									axis = 'y'
								/>
							</div>
						</div>
						<div>
							<Button variant = 'contained' onClick = {this.add}>
                ADD
              </Button>
						</div>
						<div>
							{list}
						</div>
					</Paper>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;

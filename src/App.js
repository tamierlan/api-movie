import React, { Component } from 'react';
import './App.css';
import Tape from './Tape.PNG';
import style from './styling.module.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.performSearch('titanic')
  }
  performSearch(searchTerm) {
    console.log('performearch using movie db')
    const urlString = 'https://api.themoviedb.org/3/search/movie?api_key=dd2bb9663dfda1829956fbf2e12eeed7&query=' + searchTerm;
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log('fetched data successfully')
        const results = searchResults.results

        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = 'https://image.tmdb.org/t/p/w185' + movie .poster_path

          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows: movieRows})
      },

      error: (xhr, status, err) => {
        console.log('failed to fetch the data')
      }
    })
  }

  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  }


  render() {
    return (
      <div>
        <table className={style.navbar}>
          <tbody>
            <tr>
              <td>
                <img className={style.logo} src={Tape} alt="a lenta"/>
              </td>
              <td className={style.tema}>
                <h3>MoviesDB Search</h3>
              </td>
            </tr>
          </tbody>
        </table>

        <input style={{
          fontSize: 15,
          display: 'block',
          width: '99%',
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16,
        }} onChange={this.searchChangeHandler.bind(this)} placeholder='Entre search term'/>

        {this.state.rows}

      </div>
    );
  }
}

export default App;

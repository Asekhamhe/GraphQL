import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import { Helmet } from 'react-helmet';

import query from '../queries/fetchSongs';

const TITLE = 'Create Song'

class SongCreate extends Component{

    constructor(props) {
        super(props);
        
        this.state = { title: ''}
    }
    

    onSubmit(e) {
        e.preventDefault()

        this.props.mutate({
            variables     : { title: this.state.title },
            refetchQueries: [{query}]
        }).then(() => hashHistory.push('/'))

        // console.log(this.props)
    }

    render() {
     
        return (
            <div>
            <Link 
            to        = "/"
            className = "btn-floating btn-large red right"
            >
            <i className="material-icons">arrow_back</i>
            </Link>
            <Helmet>
            <title>{ TITLE }</title>
            </Helmet>
            <h3>Create a New Song</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                <label htmlFor="title">Song Title: </label>
                <input type="text"
                name      = "title"
                id        = "title"
                onChange  = {e => {this.setState({ title: e.target.value })}}
                value     = {this.state.title}
                className = "input-field"
                />
                <button className="btn waves-effect waves-light" type="submit">Create
                <i className="material-icons right">send</i>
                </button>
                 </form>
            </div>
        );
    }
}

const mutation = gql`
mutation AddSong($title: String){
    addSong(title:$title){
        id
        title
    }
  }
`

export default graphql(mutation)(SongCreate);
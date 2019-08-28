import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


class LyricCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
        }
    }

    onSubmit(e){
        e.preventDefault()

       
        this.props.mutate({
            variables: {
                content: this.state.content,
                songId : this.props.songId
            }
        })
    }
    
    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
            <label htmlFor="content">Add a Lyric</label>
            <input 
            type      = "text"
            id        = "content"
            className = "input-field"
            value     = {this.state.content}
            onChange  = {e => this.setState({content:e.target.value})}
            />
            <button className="btn waves-effect waves-light" type="submit">Create
            <i className="material-icons right">send</i>
            </button>
            </form>
        );
    }
}

const mutation = gql`
mutation AddLyricsToSong($content:String, $songId:ID){
    addLyricToSong(content:$content, songId:$songId){
      id
      lyrics{
        id
        content
        likes
      }
    }
  }
`


export default graphql(mutation)(LyricCreate);
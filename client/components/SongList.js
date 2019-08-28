import { confirmAlert } from 'react-confirm-alert'


import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {Link} from 'react-router';
import { Helmet } from 'react-helmet';

import query from '../queries/fetchSongs';


const TITLE = 'My Songs'

class SongList extends Component{

    constructor(props) {
        super(props);
        
        this.state = {showConfirm : false}
    }
    

    onSongDelete(id){
        this.props.mutate({
            variables: {id},
        }).then(() => this.props.data.refetch())
    }

    submit(id){
        confirmAlert({
          title  : 'Confirm to delete',
          message: 'Are you sure you want to delete',
          buttons: [
            {
              label  : 'Yes',
              onClick: () => this.onSongDelete(id)
            },
            {
              label  : 'No',
              onClick: () => this.props.data.refetch()
            }
          ]
        });
      };

    
    
    renderSongs(){
        return this.props.data.songs.map(({id, title}) => {return(
            <li className = "collection-item" key= {id}>
            <Link
            to={`/songs/${id}`}>
            {title} 
            </Link>
             
            <i className = "small material-icons icon-red" onClick   = {()=>this.submit(id)}>delete</i>
            </li>
            )})
    }

    render() {
      if(this.props.data.loading) { return <div> <Helmet>
        <title>{TITLE}</title>
        </Helmet>Loading...</div>}
        
        return (
            <div>
            <Helmet>
            <title>{TITLE}</title>
            </Helmet>
            <h5 className="center-align">List of Songs</h5>
            <ul className="collection">
                {this.renderSongs()}
            </ul>
            <Link
            to        = "/songs/new"
            className = "btn-floating blue right"
            >
            <i className="material-icons">add</i>
            </Link>
            </div>   
        );
    }

}

const mutation = gql`
mutation DeleteSong($id:ID) {
    deleteSong(id:$id){
     id
   }
   }
`

export default graphql(mutation)(
    graphql(query)(SongList)
)
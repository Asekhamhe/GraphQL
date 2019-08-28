import React, { Component } from 'react';
import { graphql } from "react-apollo";
import fetchSong from '../queries/fetchSong_Det';
import {Link} from 'react-router';
import Helmet from 'react-helmet'

import LyricCreate from './LyricCreate'
import LyricList from './LyricList';

class SongDetail extends Component {

    render() {
        const { song } = this.props.data

        if(!song){ return <div></div> }

        return (
            <div>
            <Helmet>
            <title>Song Details</title>
            </Helmet>
            <Link 
            to        = "/"
            className = "btn-floating blue right"
            >
            <i className="material-icons red">arrow_back</i>
            </Link>
                <p className="center-align">{song.title}</p>
                <LyricList lyrics={song.lyrics} />
                <LyricCreate songId={song.id}/>
            </div>
        );
    }
}

export default graphql(fetchSong, {
    options: props => {
        return{
            variables:{
                id: props.params.id
            }
        }
    }
})(SongDetail);
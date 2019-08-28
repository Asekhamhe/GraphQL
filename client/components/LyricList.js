import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


class LyricList extends Component {

    onLike(id, likes){
        this.props.mutate({
            variables: {id},

            optimisticResponse:{
                __typename: 'Mutation',
                likeLyric : {
                    id,
                    __typename: 'LyricType',
                    likes     : likes + 1
                }
            }
        })
    }

    renderLyrics(){
        return this.props.lyrics.map(({id, content, likes}) => {
            return(
                <li className = "collection-item" key= {id}>
                 {content}
                 
                 <div className="vote-box">
                 <span className="badge blue">{likes}</span>
                 <i 
                 onClick   = {() => this.onLike(id, likes)}
                 className = "material-icons icon-blue right">thumb_up {likes}
                 </i>
                 </div>
                 
                 
                </li>
            )
        })
    }

    render() {

        return(
            <ul className="collection">
            {this.renderLyrics()}
            </ul>
        )
       
    }
}

const mutation = gql`
mutation LikeLyrics($id:ID){
    likeLyric(id:$id){
     id
     likes
   }
   }
`

export default graphql(mutation)(LyricList);
/** @jsx React.DOM */

'use strict';

var Quiz = React.createClass({displayName: 'Quiz',

    propTypes: {
        books: React.PropTypes.array.isRequired
    },

    render: function() {
        return (
            React.DOM.ul(null, 
                 this.props.books.map(function (book) {
                    return Book( {title: book } )
                })
            )
        );
    }
});

var Book = React.createClass({displayName: 'Book',

    propTypes: {
        title: React.PropTypes.string.isRequired
    },

    render: function () {
        return (
            React.DOM.li(null,  this.props.title )
        );
    }
});

React.renderComponent(
    Quiz( {books:[
        'The Lord of the Rings',
        'Moby Dick'
    ]} ),
    document.getElementById('app')
);

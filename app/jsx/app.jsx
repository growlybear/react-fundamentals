/** @jsx React.DOM */

'use strict';

var Quiz = React.createClass({

    propTypes: {
        books: React.PropTypes.array.isRequired
    },

    render: function() {
        return (
            <ul>
                { this.props.books.map(function (book) {
                    return <Book title={ book } />
                })}
            </ul>
        );
    }
});

var Book = React.createClass({

    propTypes: {
        title: React.PropTypes.string.isRequired
    },

    render: function () {
        return (
            <li>{ this.props.title }</li>
        );
    }
});

React.renderComponent(
    <Quiz books={[
        'The Lord of the Rings',
        'Moby Dick'
    ]} />,
    document.getElementById('app')
);

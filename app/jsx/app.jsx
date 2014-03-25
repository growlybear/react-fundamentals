/** @jsx React.DOM */

'use strict';

var Quiz = React.createClass({

    propTypes: {
        books: React.PropTypes.array.isRequired
    },

    render: function() {
        return (
            <div>
                { this.props.books.map(function (book) {
                    return <Book title={ book } />
                })}
            </div>
        );
    }
});

var Book = React.createClass({

    propTypes: {
        title: React.PropTypes.string.isRequired
    },

    render: function () {
        var style = {
            padding: '5px',
            backgroundColor: 'yellow',
            margin: '5px'
        };

        return (
            <div>
                <h4 style={ style }>{ this.props.title }</h4>
            </div>
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

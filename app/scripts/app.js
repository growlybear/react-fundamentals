/** @jsx React.DOM */

'use strict';

var Quiz = React.createClass({displayName: 'Quiz',

    propTypes: {
        data: React.PropTypes.array.isRequired
    },

    getInitialState: function () {
        return {
            author: this.props.data[0],
            books: this.props.data[0].books
        };
    },

    render: function() {
        return (
            React.DOM.div( {className:"row"}, 
                React.DOM.div( {className:"col-md-4 author"}, 
                    React.DOM.img( {src: 'images/authors/' + this.state.author.imgSrc } )
                ),
                React.DOM.div( {className:"col-md-7"}, 
                     this.state.books.map(function (book) {
                        return Book( {title: book } )
                    }, this )
                ),
                React.DOM.div( {className:"col-md-1"})
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
            React.DOM.a( {href:"#", className:"bg-info title"},  this.props.title )
        );
    }
});


var data = [
    {
        name: 'Jane Austen',
        imgSrc: 'jane-austen.jpg',
        books: [
            'Pride and Prejudice',
            'Sense and Sensibility',
            'Emma'
        ]
    },
    {
        name: 'Joseph Conrad',
        imgSrc: 'joseph-conrad.png',
        books: [
            'Heart of Darkness'
        ]
    },
    {
        name: 'Charles Dickens',
        imgSrc: 'charles-dickens.jpg',
        books: [
            'A Tale of Two Cities',
            'A Christmas Carol',
            'David Copperfield',
            'Bleak House'
        ]
    },
    {
        name: 'Sigmunnd Freud',
        imgSrc: 'sigmund-frued.jpg',
        books: [
            'Jokes and Their Relation to the Unconscious',
            'Civilization and Its Discontents',
            'The Interpretation of Dreams'
        ]
    },
    {
        name: 'Friedrich Nietzsche',
        imgSrc: 'friedrich-nietzsche.jpg',
        books: ['Thus Spake Zarathustra', 'Ecce Homo', 'Beyond Good and Evil', 'Twilight of the Idols']
    },
    {
        name: 'William Shakespeare',
        imgSrc: 'william-shakespeare.jpg',
        books: [
            'King Lear',
            'A Midsommer Night\'s Dream',
            'Hamlet',
            'Richard III',
            'The Comedy of Errors'
        ]
    },
    {
        name: 'Mark Twain',
        imgSrc: 'mark-twain.jpg',
        books: ['Huckleberry Finn', 'Tom Sawyer', 'A Conecticut Yankee at King Arthur\'s Court']
    }
];


React.renderComponent(
    Quiz( {data: data } ),
    document.getElementById('app')
);

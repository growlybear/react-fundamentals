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


var data = [
    {
        name: 'Jane Austin',
        imgSrc: 'jane-austin.jpg',
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
    Quiz( {books:[
        'The Lord of the Rings',
        'Moby Dick'
    ]} ),
    document.getElementById('app')
);

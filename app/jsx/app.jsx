/** @jsx React.DOM */

'use strict';

var Quiz = React.createClass({

    propTypes: {
        data: React.PropTypes.array.isRequired
    },

    getInitialState: function () {
        return this.props.data.init();
    },

    handleBookSelected: function (title) {
        alert(title + ' clicked!');
    },

    render: function() {
        return (
            <div className="row">
                <div className="col-md-4 author">
                    <img src={ 'images/authors/' + this.state.author.imgSrc } />
                </div>
                <div className="col-md-7">
                    { this.state.books.map(function (book) {
                        return <Book title={ book } onBookSelected={ this.handleBookSelected } />
                    }, this )}
                </div>
                <div className="col-md-1"></div>
            </div>
        );
    }
});

var Book = React.createClass({

    propTypes: {
        title: React.PropTypes.string.isRequired
    },

    handleClick: function () {
        this.props.onBookSelected(this.props.title);
    },

    render: function () {
        return (
            <a href="#" onClick={ this.handleClick } className="bg-info title">{ this.props.title }</a>
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
        imgSrc: 'sigmund-freud.jpg',
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

data.init = function () {
    var books = _.shuffle(this.reduce(function (p, c, i) {
        return p.concat(c.books);
    }, [])).slice(0, 4);

    var answer = books[_.random(books.length - 1)];

    return {
        books: books,
        author: _.find(this, function (author) {
            return author.books.some(function (title) {
                return title === answer;
            });
        })
    };
};


React.renderComponent(
    <Quiz data={ data } />,
    document.getElementById('app')
);

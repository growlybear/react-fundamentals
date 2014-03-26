/** @jsx React.DOM */

'use strict';

var Quiz = React.createClass({

    propTypes: {
        data: React.PropTypes.array.isRequired
    },

    getInitialState: function () {
        return _.extend({
            bgClass: 'neutral',
            showContinue: false
        }, this.props.data.init());
    },

    handleBookSelected: function (title) {
        var isCorrect = this.state.checkAnswer(title);
        this.setState({
            bgClass: isCorrect ? 'pass' : 'fail',
            showContinue: isCorrect
        });
    },

    handleContinue: function () {
        // discard current game and start a new one
        this.setState(this.getInitialState());
    },

    render: function() {
        return (
            <div className="row">

                <div className="col-md-4 author">
                    <img src={ 'images/authors/' + this.state.author.imgSrc }
                        className="authorImage"
                    />
                </div>

                <div className="col-md-7">

                    {   this.state.books.map(function (book) {
                            return <Book title={ book } onBookSelected={ this.handleBookSelected } />
                        }, this )
                    }
                    <button type="button" className="btn btn-default pull-right">Create Quiz</button>

                </div>

                <div className="col-md-1">

                    <div style={{ height: '260px', marginBottom: '20px' }} className={ this.state.bgClass }></div>

                    {   this.state.showContinue ? (
                            <button type="button" onClick={ this.handleContinue }
                                style={{ width: '100%'}}
                                className="btn btn-success">Reset
                            </button>
                        ) : <span className="noContinue" />
                    }
                </div>
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
        return false;
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
        books: [
            'Thus Spake Zarathustra',
            'Ecce Homo',
            'Beyond Good and Evil',
            'Twilight of the Idols'
        ]
    },
    {
        name: 'William Shakespeare',
        imgSrc: 'william-shakespeare.jpg',
        books: [
            'King Lear',
            'A Midsummer Night\'s Dream',
            'Hamlet',
            'Richard III',
            'The Comedy of Errors'
        ]
    },
    {
        name: 'Mark Twain',
        imgSrc: 'mark-twain.jpg',
        books: [
            'Huckleberry Finn',
            'Tom Sawyer',
            'A Connecticut Yankee at King Arthur\'s Court'
        ]
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
        }),
        checkAnswer: function (title) {
            return this.author.books.some(function (t) {
                return t === title;
            })
        }
    };
};

// Initialise the app in the default route
routie({
    '': function () {
        React.renderComponent(
            <Quiz data={ data } />,
            document.getElementById('app')
        );
    }
});

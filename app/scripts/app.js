/** @jsx React.DOM */

'use strict';

var Quiz = React.createClass({displayName: 'Quiz',

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

    handleNewQuiz: function () {
        routie('add');
    },

    render: function() {
        return (
            React.DOM.div( {className:"row"}, 

                React.DOM.div( {className:"col-md-4 author"}, 
                    React.DOM.img( {src: 'images/authors/' + this.state.author.imgSrc, 
                        className:"authorImage"}
                    )
                ),

                React.DOM.div( {className:"col-md-7"}, 

                       this.state.books.map(function (book) {
                            return Book( {title: book,  onBookSelected: this.handleBookSelected } )
                        }, this ),
                    
                    React.DOM.button( {type:"button", className:"btn btn-default pull-right",
                        onClick: this.handleNewQuiz }, "Create Quiz "
                    )

                ),

                React.DOM.div( {className:"col-md-1"}, 

                    React.DOM.div( {style:{ height: '260px', marginBottom: '20px' }, className: this.state.bgClass }),

                       this.state.showContinue ? (
                            React.DOM.button( {type:"button", onClick: this.handleContinue, 
                                style:{ width: '100%'},
                                className:"btn btn-success"}, "Reset "
                            )
                        ) : React.DOM.span( {className:"noContinue"} )
                    
                )
            )
        );
    }
});

var Book = React.createClass({displayName: 'Book',

    propTypes: {
        title: React.PropTypes.string.isRequired
    },

    handleClick: function () {
        this.props.onBookSelected(this.props.title);
        return false;
    },

    render: function () {
        return (
            React.DOM.a( {href:"#", onClick: this.handleClick,  className:"bg-info title"},  this.props.title )
        );
    }
});

var QuizCreator = React.createClass({displayName: 'QuizCreator',

    getDefaultProps: function () {
        return {
            fields: [
                { ref: 'imageSrc', placeholder: 'Image Source' },
                { ref: 'title1',   placeholder: 'Book Title 1' },
                { ref: 'title2',   placeholder: 'Book Title 2' },
                { ref: 'title3',   placeholder: 'Book Title 3' },
                { ref: 'title4',   placeholder: 'Book Title 4' }
            ]
        };
    },

    handleSubmit: function () {
        var data = getRefs(this);
        return false;
    },

    render: function () {
        return (
            React.DOM.div( {className:"row"}, 
                React.DOM.div( {className:"col-md-12"}, 
                    React.DOM.h2( {className:"formHeader"}, "Create New Quiz"),

                    React.DOM.form( {role:"form", onSubmit: this.handleSubmit }, 
                        
                            this.props.fields.map(function (field) {
                                return InfoItem( {data: field } );
                            }, this),
                        

                        React.DOM.div( {className:"form-group"}, 
                            React.DOM.input( {ref:"mike", type:"text", className:"form-control",
                                placeholder:"Just a placeholder"}
                            )
                        ),

                        React.DOM.button( {type:"submit", className:"btn btn-default"}, "Submit")
                    )
                )
            )
        );
    }
});

var InfoItem = React.createClass({displayName: 'InfoItem',
    render: function () {
        return (
            React.DOM.div( {className:"form-group"}, 
                React.DOM.input( {ref: this.props.data.ref,  type:"text", className:"form-control",
                    placeholder: this.props.data.placeholder }
                )
            )
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

function getRefs(component) {
    var results = {};
    console.log(component);
    console.log('============= 1 =============');
    console.log(_.keys(component.refs));
    console.log('============= 2 =============');
    console.log(Object.keys(component.refs));

    return false;
    _.each(_.keys(component), function (item) {
        console.log(item);
    });
}

// Initialise the app in the default route
routie({
    '': function () {
        React.renderComponent(
            Quiz( {data: data } ),
            document.getElementById('app')
        );
    },
    'add': function () {
        React.renderComponent(
            QuizCreator(null ),
            document.getElementById('app')
        );
    }
});

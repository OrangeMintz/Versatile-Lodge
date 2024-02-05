
import React, {useState, useEffect} from 'react';
import './randomQuote.css';

const RandomQuote = () => {

    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    // http://api.quotable.io/random

    useEffect(() => {
        fetch("http://api.quotable.io/random")
        .then(res => res.json())
        .then(
            (quote) => {
                setQuote(quote.content);
                setAuthor(quote.author);
                console.log(quote);
            }
        )
    }, []);

    let fetchNewQuote = () => {
        fetch("http://api.quotable.io/random")
        .then(res => res.json())
        .then(
            (quote) => {
                setQuote(quote.content);
                setAuthor(quote.author);
                console.log(quote);
            }
        )
    }

    return (
        <div className="App">
            <div className="quote">
                <h2>{quote}</h2>
                <small>-{author}</small>
            </div>
            <br />
            <button className="btnQ" onClick={fetchNewQuote}>Generate New Quote</button>
        </div>
    )
}

export default RandomQuote;


import React, { useState } from 'react';

const Search = (props) => {
    //Declare state variables to handle user input and the search results
    const [inputValue, setInputValue] = useState('');
    const [results, setResults] = useState([]);
    const newResults = [];
    //const [userList, setUserList] = useState([]);

    //Create a list of all book titles and add them to a list
    let list = [];
    props.books && props.books.map(item => (
        list.push(item.title)
    ));

    //Function to handle input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    //Handle form submissions
    const handleSubmit = (event) => {
        //Prevent page from reloading on submission
        event.preventDefault();
        
        props.setSearchCounter(0);

        //Loop through every result to check if it is in list of books
        for (let i=0; i < list.length; i++){
            if (list[i].toLowerCase().includes(inputValue.toLowerCase())){
                newResults.push(list[i]);
            }
        }
        //The counter state we modify in order to include an example of state lifting
        props.setSearchCounter(newResults.length);

        //Make sure to save changes
        if (newResults.length === 0){
            props.setSearchCounter(0);
            setResults(["No Entries available"]);
        }
        else {
            setResults(newResults);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button type="submit">Search</button>
            </form>

            <ul>
                <h3>Total Results {props.searchCounter}</h3>
                {results.map((result, index) => (
                    <li key={index}>{result}</li>
                ))}
            </ul>
        </div>
    );
}

export default Search;

const Homepage = (props) =>{
    //Displays each book title and their rank
    return(
        <div>
            <h3>All Books</h3>
            <ul>
                {props.books && props.books.map(item => (
                    <li key={item.id}>Title: {item.title}, Rank: {item.rank}</li>
                ))}
		    </ul>
        </div>
    );
}

export default Homepage;
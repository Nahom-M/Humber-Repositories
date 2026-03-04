import Homepage from "./Homepage";

const HomepageContainer = (props) => {
    //This is the container we used for prop drilling
    return(
        <div>
            <Homepage books={props.books}/>
        </div>
    );
}

export default HomepageContainer;
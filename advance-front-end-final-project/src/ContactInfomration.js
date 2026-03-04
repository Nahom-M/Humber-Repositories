import Form from 'react-bootstrap/Form';

const ContactInformation = () =>{
    //This component simply creates a form for contact.js
    return(
        <div>
            <h2>Contact Us</h2>
            <Form>
                <label>Name</label><br></br>
                <input type="text" name="name" placeholder='Name'/>
                <br></br><br></br>
                <label>Email</label><br></br>
                <input type="email" name="email" placeholder='Email'/>  
                <br></br><br></br>
                <label>Message</label><br></br>
                <textarea name="message" placeholder='Enter your message'></textarea>
                <br></br><br></br>
            </Form>
        </div>
    );
}

export default ContactInformation;
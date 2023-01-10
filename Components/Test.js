import axios from 'axios';
import React, { useEffect } from 'react';
import styles from '../styles/form.module.css'

const Test = () => {
    const [eventslist, setEventslists] = React.useState([]);
    const [eventID, setEventID] = React.useState(null);
    const [descripton, setDescription] = React.useState([]);
    const [currentDescripton, setCurrentdescription] = React.useState("");

console.log(currentDescripton);


    const handleSubmit = event =>{
        event.preventDefault()
        const form = event.target;
        const description = form.description.value;
        setDescription(description)


        try{
        axios.post("http://127.0.0.1:5000/events",{description})
        .then((response) => {
            console.log(response.data)
            const data = response.data;
            setEventslists([...eventslist, data]);
            setDescription("")
        });
        }
        catch(err){
            console.log(err);

        }
    
    form.reset()
    }

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/events")
        .then((response) => {
            //  console.log(response.data.event)
            setEventslists(response.data.event)
            

            });
    },[])


const handleDeleteEvent = id =>{
    // event.preventDefault()
    try{
        axios.delete(`http://127.0.0.1:5000/events/${id}`)
        // .then(res => console.log(res))
        const updatedList = eventslist.filter(event => event.id !== id)
        setEventslists(updatedList)
    }
    catch(err){
            console.log(err);
        }
}





const handleUpdateChange = e => {
    e.preventDefault();
    const secondaryDescription = e.target.newDescription.value
    setCurrentdescription(secondaryDescription)
    // const newDescription = JSON.stringify(currentDescripton)
    axios.put(`http://127.0.0.1:5000/events/${eventID}`, {"description" : secondaryDescription})
    .then(res => {
        console.log(res);  

    })
    
        setCurrentdescription("")
        setEventID(null)
}




    const handleUpdate = event =>{
        setEventID(event.id)
    setCurrentdescription(event.description)
    

}
    
const Updateform = () => {
    return (
        <form onSubmit={handleUpdateChange} >
        <input defaultValue={currentDescripton} className={styles.forms} type="text" name="newDescription" id="" placeholder='new description'/> <br />
        <input className={styles.submit} type="submit" value="Update" />
        </form>
    )
}
   

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input className={styles.forms} type="text" name="description" id="" placeholder='description'/> <br />
                <input className={styles.submit} type="submit" value="Submit" />
            </form>
            <br />
            <br />
            <div>
            {
                eventslist.map((event, index) =>{

                    
                    return(
                        <li className={styles.lists} key={index}><p>{event.description}</p>
                        <button 
                        onClick={() => handleDeleteEvent(event.id)}
                        >X</button>
                        <button 
                        onClick={() => handleUpdate(event)}
                        >Update</button></li>
              
                            
                        )
                            }
                    
                )              
            }

            </div>
            {/* <p>hi</p> */}
            {eventID > 0 && <Updateform></Updateform>
}

        
        </div>
    );
};

export default Test;
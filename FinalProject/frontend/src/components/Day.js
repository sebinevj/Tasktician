import "./Day.css"
import { useState, useRef, useEffect } from "react";
import ContentBlock from "./ContentBlock";
import { useNavigate } from "react-router-dom";


/**
 * 
 * @param index represents the index of day in a week
 *         0 == Mondey, 1 == tuesday,  2 == wednesday 
 * @returns 
 */
export default function Day({ droppedItem, date, day , index, setDroppedItem, isDraggingFromNote, setIsDraggingFromNote}){

  const navigate = useNavigate();

    // State to store the content blocks
    const [contentBlocks, setContentBlocks] = useState([]);
    const [contentChanged, setContentChanged] = useState(0);
    const [online, setOnline] = useState(window.navigator.onLine);
    const [currentUser, setCurrentUser] = useState(-1);

    fetch('/api/users/current').then(res => res.json()).then(user => {
      if (user.error) {
        navigate('/');
      }
      setCurrentUser(user.id);
    }).catch(err => {
      console.log(err)
    })

    useEffect(() => {
      window.addEventListener("online", () => setOnline(true))
      window.addEventListener("offline", () => setOnline(false))
    }, [])

    useEffect(() => {
      if (currentUser != -1) {
        fetch(`/api/timeblock/${index}/${currentUser}`)
          .then(res => res.json())
          .then(function(data){
              console.log("content data is..", data);
              if (data.error) {
                console.log(data.error)
              }
              else {
                setContentBlocks(data.timeblocks);
                console.log("Block", contentBlocks);
              }
          });
        }
    },[currentUser, contentChanged]);

    // State to store time blocks 
    const [hours, setHours] = useState([
        { id: 1, name: '8:00 AM' },
        { id: 2, name: '8:30 AM' },
        { id: 3, name: '9:00 AM' },
        { id: 4, name: '9:30 AM' },
        { id: 5, name: '10:00 AM' },
        { id: 6, name: '10:30 AM' },
        { id: 7, name: '11:00 AM' },
        { id: 8, name: '11:30 AM' },
        { id: 9, name: '12:00 PM' },
        { id: 10, name: '12:30 PM' },
        { id: 11, name: '1:00 PM' },
        { id: 12, name: '1:30 PM' },
        { id: 13, name: '2:00 PM' },
        { id: 14, name: '2:30 PM' },
        { id: 15, name: '3:00 PM' },
        { id: 16, name: '3:30 PM' },
        { id: 17, name: '4:00 PM' },
        { id: 18, name: '4:30 PM' },
        { id: 19, name: '5:00 PM' },
        { id: 20, name: '5:30 PM' },
        { id: 21, name: '6:00 PM' },
        { id: 22, name: '6:30 PM' },
        { id: 23, name: '7:00 PM' },
        { id: 24, name: '7:30 PM' },
        { id: 25, name: '8:00 PM' },
        { id: 26, name: '8:30 PM' },
        { id: 27, name: '9:00 PM' },
        { id: 28, name: '9:30 PM' },
        { id: 29, name: '10:00 PM' },
        { id: 30, name: '10:30 PM' },
        { id: 31, name: '11:00 PM' },
        { id: 32, name: '11:30 PM' },
        { id: 33, name: '12:00 AM' },
    ]);

    const [hoveredItem, setHoveredItem] = useState(null);
    

    const addBlock = (startHeight, startTime , indexOfDay, DroppedContent) => {
      console.log("In add", startHeight, startTime, indexOfDay, DroppedContent)
        if (!online) {
          alert("Go online to add todo to calendar.")
        }
        else {
          fetch(`/api/timeblock/${currentUser}`, {
            method: 'POST',
            body: JSON.stringify({text: DroppedContent, startTime: startTime, day: indexOfDay, startHeight}),
            headers: {
                'Content-Type': 'application/json',
              },
            }).then(data => {
              console.log(data);
              setContentChanged(c => c+ 1)
          }).catch(err => {
            console.log(err);
          })
        }
    }


    const handleMouseEnter = (item) => {
        setHoveredItem(item);
      };
    
    const handleMouseLeave = () => {
        setHoveredItem(null);
    };
    
    // Declare ItemComponent inside ParentComponent for access to handleMouseEnter and handleMouseLeave
    function TimeBlock({ item, isDropped, addBlock, index }) {

      const isHovered = hoveredItem && item.id === hoveredItem.id  && !isDropped;

      const handleDrop = (e) => {
        e.preventDefault(); // Prevent default to allow dropping
        addBlock(item.id, item.name, index, droppedItem);
        setIsDraggingFromNote(false);
        
      };
    
      const handleDragOver = (e) => {
        e.preventDefault(); // Necessary to allow dropping
      };

      const handleOnClick = (e) =>{
        if(!isDraggingFromNote){
          console.log("isDraggingFromNote in handleOnclick", isDraggingFromNote);
          addBlock(item.id, item.name, index);
        }
        
      }
    
      return (
        <div 
          onDragOver={handleDragOver} 
          onDrop={(e)=>handleDrop(e)}
          style={{ background: isHovered ? 'lightblue' : 'transparent' }}
          onMouseEnter={() => handleMouseEnter(item)}
          onMouseLeave={handleMouseLeave}
          onClick={()=>handleOnClick()}
        >
          {item.name}
          
        </div>
      );
    }


    return(
        <div className="dayWrapper">
            <div className={date && day ? "dayName" : "dayNameNull"}>
                {date && day &&
                  <div className="d-flex">
                     
                    <div>
                      <div>{date}</div>
                      <div>{day}</div>
                    </div>
                    
                  </div>
                }
            </div>
            <div className="table_list">
            
             {hours.map(item => (
                <TimeBlock
                key={item.id}
                item={item}
                addBlock={addBlock}
                index={index}
                />
            ))}
            
            </div>
            <div className="contentWrapper">
              {contentBlocks.map((block) => (
                <ContentBlock key={block.timeblock_id} block={block} setContentChanged={setContentChanged} setContentBlocks={setContentBlocks}/>
              ))}
            </div>
        </div>
    )
}
import "./ContentBlock.css";
import { useState, useRef, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export default function ContentBlock  ({ block, setContentBlocks, setContentChanged}){
    // const [isDragging, setIsDragging] = useState(false);
    // const [isResizing, setIsResizing] = useState(false);

    const [online, setOnline] = useState(window.navigator.onLine);

    useEffect(() => {
      window.addEventListener("online", () => setOnline(true))
      window.addEventListener("offline", () => setOnline(false))
    }, [])

    const [position, setPosition] = useState({ x: 0, y: 60 + (60 * (block.start_height - 1)) });
    const [size, setSize] = useState({ width: 130, height: 60 }); 

    const borderWidth = 6;
    const [cursorStyle, setCursorStyle] = useState('default');

    const contentBlock_divRef = useRef();
  
    const isDragging = useRef(false);
    const isResizing = useRef(false);

   

    const isClickedOnBorder = (e) =>{
      const { top, left, bottom, right } = contentBlock_divRef.current.getBoundingClientRect();
      const { clientX, clientY } = e;
  
      // Check if the click is within the border width from any edge
      const clickedOnBorder = clientX <= left + borderWidth || 
                              clientX >= right - borderWidth ||
                              clientY <= top + borderWidth ||
                              clientY >= bottom - borderWidth;

      return clickedOnBorder;
    }

    const isHoveredWithinBorder = (e) =>{
      const { top, left, bottom, right } = contentBlock_divRef.current.getBoundingClientRect();
      const { clientX, clientY } = e;
  
      // Check if the click is within the border width from any edge
      const clickedOnBorder = clientX > left + borderWidth && 
                              clientX < right - borderWidth &&
                              clientY > top + borderWidth &&
                              clientY < bottom - borderWidth;

      return clickedOnBorder;
    }




    const handleMouseDown = (e) => {

      // Determine if the resize handle is clicked or the block itself
      // if (e.target.className === 'contentBlock_div') {
      //   isResizing.current = true;
      // } else
      
      if(isHoveredWithinBorder(e) && e.target.className === 'contentBlock_div'){
        //setIsDragging(true);
        isDragging.current = true;
      }
      

      // const { top, left, bottom, right } = contentBlock_divRef.current.getBoundingClientRect();
      // const { clientX, clientY } = e;
  
      // // Check if the click is within the border width from any edge
      // const clickedOnBorder = clientX <= left + borderWidth || 
      //                         clientX >= right - borderWidth ||
      //                         clientY <= top + borderWidth ||
      //                         clientY >= bottom - borderWidth;
  
      if (isClickedOnBorder(e)) {
        console.log('Clicked on border!');
      }
      

      // Prevent text selection
      // e.preventDefault(); 
      // e.stopPropagation();
      console.log("mouse down on contentBlock_div");
    };
  
    const handleMouseMove = (e) => {
      if (isDragging.current) {
        // Update block position based on mouse movement
        setPosition({
          x: position.x + e.movementX,
          y: position.y + e.movementY,
        });
      }

      //   contentBlock_divRef.current.transform = `translate(${position.x}px, ${position.y}px)`
      // } else if (isResizing) {
      //   // Update block size based on mouse movement
      //   setSize({
      //     width: size.width + e.movementX,
      //     height: size.height + e.movementY,
      //   });
      // }
      setCursorStyle(isClickedOnBorder(e) ? 'n-resize' : 'default');

      if(isHoveredWithinBorder(e)){
        setCursorStyle(isHoveredWithinBorder(e)  ? 'grab' : 'default')
      }

     
     
    };
  
    const handleMouseUp = () => {
      // setIsDragging(false);
      // setIsResizing(false);
      isDragging.current = false;
    };

    const handleInputOnClick = (e) =>{
      console.log("input clicked");
    }
  

    const deleteButton = (timeblock_id) => () => {
      console.log("indeleteblock");
      if (!online) {
        alert("Go online to remove timeblock.")
      }
      else {
        fetch(`/api/timeblock/${timeblock_id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
            },
          }).then(goal => {
            console.log(goal);
            setContentChanged(c => c-1)    
        }).catch(err => {
          console.log(err);
        })
      }

      /*

      setContentBlocks(prevBlocks => {
        // Filter out the block with the specific ID
        const filteredBlocks = prevBlocks.filter(currBlock => currBlock.id !== block.id);
        // Add the new block to the filtered list
        return [...filteredBlocks];
      });
      */

    }

    return (
      <div className="contentBlock_div"
        ref={contentBlock_divRef}
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
         
          top: `${position.y}px`,
          left: `${position.x}px`,
          position: 'absolute',
          border: '1px solid black',
          zIndex: 3,
        
          cursor: cursorStyle,
          borderRadius: "15px",
          border: "1px solid black",
          backgroundColor: "#91A7D2",
          boxShadow: "2px 2px 2px black"
        }}
        onMouseDown={handleMouseDown}
        // onMouseMove={isDragging || isResizing ? handleMouseMove : null}
        onMouseMove={(e)=>handleMouseMove(e)}
        onMouseUp={handleMouseUp}
      >
        <div>

          <div className="d-flex justify-content-between">
          {block.start_time}
          <IconButton aria-label="comments" onClick={deleteButton(block.timeblock_id)} className="deleteButton"  style={{width: '1.3rem', height: '1.3rem'}}>
            <CloseIcon className="deleteIcon" style={{width: '.75rem', height: '.75rem'}}/>
          </IconButton>
          </div>

          <div>
            {block.block_text && 
              <>{block.block_text}</>
            }
            {!block.block_text && 
            <input 
            className="contentBlock_input"
            type="text"
              onClick={(e)=>handleInputOnClick(e)}
               style={{
                width: '100%',
                border:0,
                outline:0,
                backgroundColor: "#91A7D2"
               }}
            >
            </input>
            }
          </div>
        </div>
        
        {/* <div
          className="resize-handle"
          style={{
            width: '10px',
            height: '10px',
            backgroundColor: 'red',
            position: 'absolute',
            right: '0',
            bottom: '0',
            cursor: 'nwse-resize',
          }}
        ></div> */}
      </div>
    );
  };
  
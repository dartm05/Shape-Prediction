
import React from "react";
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
// reactstrap components
import { Button, Card, Container, Row, Col,Navbar} from "reactstrap";
import { useRef, useState, useEffect } from "react";
import html2canvas from 'html2canvas';



function Canvas(props) {

  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState();
  const [isDrawing,setIsDrawing]= useState(false);
  const contextRef = useRef(null);

  useEffect(()=>{
    const canvas= canvasRef.current
    canvas.width = 1000;
    canvas.height= 1000;
    canvas.style.width = `${500}px`;
    canvas.style.height = `${500}px`;

    const context = canvas.getContext("2d")
    context.scale(2,2)
    context.lineCap="round"
    context.strokeStyle = "black"
    context.lineWidth = 5
    contextRef.current = context;

  },[])


  const handleSubmit = async() => {
    
    const element = canvasRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    setDrawing(data);
    // const link = document.createElement('a');

    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data)
    // };

    //   const url = `/predict`;
    //   console.log(url);
    //   const res = await fetch(url,requestOptions)
    //   .then(response => response.json())
    //   .then(res => console.log(res));
    
  }

  const startdrawing = ({nativeEvent}) => {
    const {offsetX, offsetY}= nativeEvent;
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX,offsetY)
    setIsDrawing(true)
  }

  const endDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = ({nativeEvent}) => {
    if(!isDrawing){
      return
    }
    const {offsetX, offsetY}= nativeEvent;
    contextRef.current.lineTo(offsetX,offsetY)
    contextRef.current.stroke()

  }

  const clear = () =>{
    const canvas= canvasRef.current
    canvas.width = 1000;
    canvas.height= 1000;
    canvas.style.width = `${500}px`;
    canvas.style.height = `${500}px`;
    const context = canvas.getContext("2d")
    context.scale(2,2)
    context.lineCap="round"
    context.strokeStyle = "black"
    context.lineWidth = 5
    contextRef.current = context;

  }
  
    return(
       <div >
           <br/>
           <br/>
           <br/>
            <h1>Shape predictor</h1>
            <br/>
            <img height={230} src={drawing} alt="exported drawing" />
              
            <section>
               <Row>
                <Col xs={3}>
                
                </Col>
                <Col xs={6}>
                <canvas
                onMouseDown={startdrawing}
                onMouseUp={endDrawing}
                onMouseMove= {draw}
                ref={canvasRef}
                />
                </Col>

                <Col xs={3}>   
                </Col>
               </Row>
               <br/>
               <br/>
               <br/>
               <Row xs={12}>
                <div>
                <Button className="button m-4 " active={true} title="Submit" onClick={handleSubmit}><p>Submit</p></Button>
                
                <Button className="button m-4 " active={true} title="Submit" onClick={clear}><p>Clear</p></Button>
                </div>
               </Row>
            </section>
       </div>
    );
}
export default Canvas;
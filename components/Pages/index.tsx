import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import { ColorType } from '../Libs/LightweightChart/types';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  let name = "Weather"
                                            //{{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}>

  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <br-x />
      <Window title={name} style={{ 
      backgroundColor:"#fadbd8",//"#cad6d2",
      fontSizeAdjust:"from-font",
      fontVariant:"ruby",
      fontStyle:"initial",  
      
      
      
      }}>
        

        <div style={{
          width: "50%", height:265, backgroundColor: "#B784B7", borderRadius: 20,
           marginTop: "35px", padding: "15px",
          marginRight: "230px",
          borderStyle: "solid",
          borderColor: "darkblue",
          fontPalette: "light",
          fontSize:"500"
        }}>
          
          
          <h1 style={{
            textAlign:"left"
          }}>location : Iran Fars Shiraz 🗺️ </h1>
          
         
      

          <p style={{textAlign: "center",marginTop:"15px"}}>temp_C 🌡️: {(props.condition).toLocaleString("fa-IR")}</p>

          <br></br>

          <p style={{textAlign: "center"}}>temp_F 🌡️: {(props.condition1).toLocaleString("fa-IR")}</p>


          <p style={{textAlign: "center",marginTop:"15px"}}> humidity💧 : {(props.condition4).toLocaleString("fa-IR")}</p>

          <br></br>

          
          <p style={{textAlign: "center"}}>uvIndex 😎: {(props.condition6)}</p>
          
          
          <p style={{textAlign: "center",marginTop:"15px"}}>moon_phase🌛 : {(props.condition2).toLocaleString("fa-IR")}</p>
          
          
          <p style={{textAlign: "center",marginTop:"15px",marginBlockEnd:"15px"}}>localObsDateTime⌛: {(props.condition5)}</p>

          <br></br>
          
         
          

        
      
        </div>
        
        
        
       

        
        
      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;



  let res = await fetch("https://cdn.ituring.ir/research/api/weather");
  let data = await res.json()

  let condition = await data.current_condition;
  let condition3= await data.weather[0].astronomy[0].moon_phase
  let condition4 =await data.current_condition.humidity
  let condition5 =await data.current_condition.localObsDateTime
  let condition6 =await data.current_condition.uvIndex
  let condition1 = await data.current_condition.temp_F;
  
  
  
  console.log(condition[0].temp_C)
  console.log(data.weather[0].astronomy[0].moon_phase)
  console.log(data.current_condition.humidity)
  console.log(data.current_condition.localObsDateTime)
  console.log(data.current_condition.uvIndex)
  console.log(data.current_condition.temp_F)
  

  return {
    props: {
      data: global.QSON.stringify({
        condition: condition[0].temp_C,
        condition2 :condition3,
        condition4: condition[0].humidity,
        condition5 :condition[0].localObsDateTime,
        condition6 :condition[0].uvIndex,
        condition1: condition[0].temp_F,
        
        session,
        // nlangs,
      })
    },
  }
}
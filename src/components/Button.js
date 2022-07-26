import { useContext } from "react"
import { CalcContext } from '../context/CalcContext'

const getStyleName = btn =>{
  const className=  {
    '=' : 'equals',
    'x' : 'opt',
    '-' : 'opt',
    '+' : 'opt',
    '/' : 'opt',
    'C' : 'opt',
    '+-' : 'opt',
    '%' : 'opt',
        
  }
  return className[btn]
}
const Button = ({ value }) => {
  const{ calc,setCalc }=useContext(CalcContext);
  
  //Comma button click by user
  const  commaClick=() =>{
    setCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num +value : calc.num
    });
  }
  //Clear button click by user
  const resetClick = () =>{
    setCalc({sign: '',num:0, res:0})
  }
  //Number click by user
  const handleClickButton=()=>{
    const numberString =value.toString()
    let numberValue;
    if(numberString==='0' && calc.num===0){
      numberValue="0"
    }else{
      numberValue=Number(calc.num+ numberString)
    }
    setCalc({
      ...calc,
      num: numberValue
    })
  }
  //sign click by user
  const signClick=()=>{
    setCalc({
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num:0
    })
  }
  //equals click by user
  const equalsClick=()=>{
    if(calc.res && calc.num)
    {

    
      const math=(a,b,sign)=>{
        const result ={
          '+':(a,b)=>a+b,
          '-':(a,b)=>a-b,
          'x':(a,b)=>a*b,
          '/':(a,b)=>a/b,
        }
        return result[sign](a,b);
      }
      setCalc({
        res: math(calc.res,calc.num,calc.sign),
        sign:' ',
        num:0
  
      })
    }
   
  }
  //percent button click by user
  
  const percentClick=()=>{
    setCalc({
      num:(calc.num/100),
      res:(calc.res/100),
      sign: ''
    })
  }
  //invert button click by user
  const invertclick=()=>{
    setCalc({
      num:calc.num ? calc.num*-1 :0,
      res:calc.res ? calc.res*-1 :0,
      sign:''
    })
  }
  const handleBtnClick = () => {
    const results={
      '.':commaClick,
      'C':resetClick,
      '/':signClick,
      '+':signClick,
      '-':signClick,
      'x':signClick,
      '=':equalsClick,
      '%':percentClick,
      '+-':invertclick

    }
    if(results[value]){
      return results[value]()
    } else {
      return handleClickButton()
    }
  }
  return (
    <button onClick={handleBtnClick} className={`${getStyleName(value)} button`}>{value}</button>
  )
}

export default Button
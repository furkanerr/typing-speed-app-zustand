import Service from '../../services/api'
const createGameSlice =(set,get)=>({
    textData:[],
    duration:60,
    correctAnswers:0,
    wrongAnswers:0,
    timer: ()=>{
      set({duration:this.duration-1})
    },
    reStartTheGame:()=>{
      set({duration:60,correctAnswers:0,wrongAnswers:0})
    },
    fetchText: async ()=>{
      const  response = await Service.getText()
    set({textData: await response[0].split(' ')});
    },

})

export default createGameSlice;
import Service from "../../services/api";
const createGameSlice = (set, get) => ({
  textData: [],
  duration: 60,
  correctAnswers: 0,
  wrongAnswers: 0,
  checkIfCorrect: (result) => {
    if (result) {
      set({ correctAnswers: get().correctAnswers + 1 });
    } else {
      set({ wrongAnswers: get().wrongAnswers + 1 });
    }
    console.log(get().correctAnswers);
    console.log(get().wrongAnswers);
  },
  myTimer: () => {
    let timer = setInterval(() => {
    set({ duration: get().duration - 1 })
    if (get().duration === 0) {
      clearInterval(timer);
    }
    }, 1000);
  },
  reStartTheGame: () => {
    set({ duration: 60, correctAnswers: 0, wrongAnswers: 0 });
  },
  fetchText: async () => {
    const response = await Service.getText();
    set({ textData: await response[0].split(" ") });
  },
});

export default createGameSlice;

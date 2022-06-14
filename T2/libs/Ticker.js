// Dado um intervalo e uma funcao, chama a mesma a cada intervalo
// e reseta o contador ( precisa ser chamado o update a cada render )
const Ticker = function (interval = 1000, onTick) {
  this.interval = interval;
  this.counter = 0;

  this.update = (dt) => {
    this.counter += dt;

    if (this.counter >= this.interval) {
      this.counter = 0;

      if (onTick) onTick();
    }
  };
};

export default Ticker;

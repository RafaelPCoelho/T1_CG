import { pushObject } from "../libs/utils/funcs.js";

// Dado um tipo de entidade, cria uma lista com chaves
// unicas ( que nunca se repetem ), alem de possuir
// uma funcao para adicionar uma entidade do tipo e
// atualizar todas
const EntityList = function (Type) {
  this.entities = {};

  this.add = (...params) => {
    let key = pushObject(this.entities, null);
    this.entities[key] = new Type(...params, () => {
      delete this.entities[key];
    });
  };

  this.isEmpty = () => {
    return Object.values(this.entities).length == 0;
  };

  this.update = (dt) => {
    Object.values(this.entities).forEach((entity) => entity.update(dt));
  };
};

export default EntityList;

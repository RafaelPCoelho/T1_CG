// Dado uma variavel do tipo objeto
// adiciona uma nova chave-valor
// com a chave sempre sendo incrementada,
// para não haver colisões de chaves
// e retorna essa chave
export const pushObject = (object, value) => {
  var keys = Object.keys(object);
  var next = keys[keys.length - 1] + 1;

  object[next] = value;
  return next;
};

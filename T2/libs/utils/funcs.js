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

export const iterateCalling = (
  targetArray = [],
  functionName = "",
  ...params
) => {
  targetArray.forEach((value) => value[functionName](params));
};

export const predictPosition = (
  from,
  to,
  speedFrom,
  speedTarget,
  variation,
  dt = 16.66
) => {
  let projection = to.clone();
  let dist = projection.distanceTo(from);

  // Prevê o tempo do hit da bala com o aviao
  let hitDelay = dist / (speedFrom * (dt / 1000));

  // Define local da projeção, com uma variação para garantir erro/acerto
  projection.add(
    speedTarget
      .multiplyScalar(hitDelay)
      .addScalar(-variation + Math.random() * 2 * variation)
  );

  return projection;
};

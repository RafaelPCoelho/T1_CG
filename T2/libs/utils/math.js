/**
 * Traça uma função linear entre dois valores e retorna
 * o valor de y quando x representa step % da distância
 *
 * @param from Valor de origem
 * @param to Valor de destino
 * @param step Percentual da distância
 * @returns O valor da função quando X equivale a step % da distância
 */
const lerp = (from, to, step) => from + (to - from) * step;

/**
 * Retorna um valor dentro do seu max e do seu min
 *
 * @param val O valor de entrada
 * @param min O mínimo da saída
 * @param max O máximo da saída
 * @returns O valor de entrada, min caso ele seja menor que min, ou max caso ele seja maior que max
 */
const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
/**
 * Auxiliar da função lerp, porém impedindo que o valor
 * extrapole os limites
 *
 * @returns O valor de lerp(from, to, step) entre 0 e 1
 */
const slerp = (from, to, step) => lerp(from, to, clamp(step, 0, 1));

export { lerp, clamp, slerp };

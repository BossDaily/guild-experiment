
export async function checkGuild(exp: string, id: string) {
  const checkExperiment = await fetch(`https://experiments.dscrd.workers.dev/experiments/check/${exp}/${id}`);

  return await checkExperiment.json();
}
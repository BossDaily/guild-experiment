
export async function checkGuild(exp: string, id: string) {
  const checkExperiment = await fetch(`https://experiments.dscrd.workers.dev/experiments/check/${exp}/${id}`).then(res => { return res.json() }).catch((err) => { return 'there was an error' });

  return checkExperiment

}
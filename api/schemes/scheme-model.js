const db = require('../../data/db-config');

async function find() {
  const rows = await db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .select('sc.*')
    .count('st.step_id as number_of_steps')
    .groupBy('sc.scheme_id')
    .orderBy('sc.scheme_id', 'asc');
  return rows;
}

async function findById(scheme_id) {
  const rows = await db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .select('sc.scheme_name', 'st.*')
    .where('sc.scheme_id', scheme_id)
    .orderBy('st.step_number', 'asc');

  if (!rows.length) {
    return null;
  }

  return {
    scheme_id: Number(scheme_id),
    scheme_name: rows[0].scheme_name,
    steps: rows
      .filter((row) => row.step_id)
      .map(({ step_id, step_number, instructions }) => ({
        step_id,
        step_number,
        instructions,
      })),
  };
}

async function findSteps(scheme_id) {
  const rows = await db('steps as st')
    .join('schemes as sc', 'st.scheme_id', 'sc.scheme_id')
    .select('st.step_id', 'st.step_number', 'st.instructions', 'sc.scheme_name')
    .where('sc.scheme_id', scheme_id)
    .orderBy('st.step_number', 'asc');
  return rows;
}

async function add(scheme) {
  return db('schemes')
    .insert(scheme)
    .then(([id]) => findById(id));
}

async function addStep(scheme_id, step) {
  await db('steps').insert({ ...step, scheme_id });
  return findSteps(scheme_id);
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
};
